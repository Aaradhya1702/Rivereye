const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const WaterQuality = require("../models/WaterQuality");
const MLR = require("ml-regression").SimpleLinearRegression;

// RHI (River Health Index) = composite score 0–100
router.get("/rhi/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // Get latest record
    const latest = await WaterQuality.find({ location })
      .sort({ date: -1 })
      .limit(1);

    if (!latest || latest.length === 0) {
      return res.status(404).json({ message: "No data for this location" });
    }

    const params = latest[0].parameters;

    // Normalized scoring (basic example, tweak as you like)
    let score = 0;

    // Dissolved Oxygen (higher is better)
    score += Math.min((params.DO / 10) * 25, 25); // up to 25 points

    // BOD (lower is better)
    score += Math.max(
      0,
      (3 / params.BOD) * 25 > 25 ? 25 : (3 / params.BOD) * 25
    );

    // Nitrate (lower is better)
    score += Math.max(
      0,
      (10 / params.Nitrate) * 25 > 25 ? 25 : (10 / params.Nitrate) * 25
    );

    // Fecal Coliform (lower is better)
    score += Math.max(
      0,
      (500 / params.FecalColiform) * 25 > 25
        ? 25
        : (500 / params.FecalColiform) * 25
    );

    const RHI = Math.round(score);

    res.json({
      location,
      RHI,
      parameters: params,
      status: RHI >= 70 ? "Good" : RHI >= 40 ? "Moderate" : "Poor",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET monthly comparison for a city
// Route: /api/water/monthly-comparison/:location
router.get("/monthly-comparison/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // Fetch last 60 days of data for the city
    const records = await WaterQuality.find({ location }).sort({ date: 1 });

    if (!records.length) {
      return res.status(404).json({ message: "No data found" });
    }

    // Group data by month
    const monthlyData = {};
    records.forEach((r) => {
      const month = new Date(r.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          count: 0,
          DO: 0,
          BOD: 0,
          Nitrate: 0,
          FecalColiform: 0,
        };
      }

      monthlyData[month].count += 1;
      monthlyData[month].DO += r.parameters.DO;
      monthlyData[month].BOD += r.parameters.BOD;
      monthlyData[month].Nitrate += r.parameters.Nitrate;
      monthlyData[month].FecalColiform += r.parameters.FecalColiform;
    });

    // Calculate averages
    const result = Object.keys(monthlyData).map((month) => ({
      month,
      DO: (monthlyData[month].DO / monthlyData[month].count).toFixed(2),
      BOD: (monthlyData[month].BOD / monthlyData[month].count).toFixed(2),
      Nitrate: (monthlyData[month].Nitrate / monthlyData[month].count).toFixed(
        2
      ),
      FecalColiform: (
        monthlyData[month].FecalColiform / monthlyData[month].count
      ).toFixed(2),
    }));

    res.json({ location, comparison: result });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Forecast next 3 days
router.get("/forecast/:location/:parameter", async (req, res) => {
  try {
    const { location, parameter } = req.params;

    // Fetch last 10 days of historical data
    const data = await WaterQuality.find({ location })
      .sort({ date: -1 })
      .limit(10);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for this location" });
    }

    // Prepare data for regression
    // x = day index, y = parameter value
    const x = data.map((d, i) => i + 1); // 1,2,...10
    const y = data.map((d) => d.parameters[parameter]);

    // Create regression model
    const regression = new MLR(x, y);

    // Predict next 3 days
    const forecast = [];
    for (let i = 11; i <= 13; i++) {
      forecast.push({ day: i, predicted: regression.predict(i) });
    }

    res.json({
      location,
      parameter,
      forecast,
      lastData: data.reverse(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Export PDF endpoint
router.get("/export/:location", async (req, res) => {
  const { location } = req.params;

  const records = await WaterQuality.find({ location }).sort({ date: -1 });
  if (!records.length) return res.status(404).send("No data found");

  // Set headers
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${location}-report.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  const doc = new PDFDocument({ margin: 30, size: "A4" });
  doc.pipe(res);

  doc.fontSize(22).text(`Water Quality Report - ${location}`, {
    align: "center",
  });
  doc.moveDown();

  records.forEach((r) => {
    doc
      .fontSize(12)
      .text(
        `${r.date.toISOString().slice(0, 10)} | DO: ${r.parameters.DO} | BOD: ${
          r.parameters.BOD
        } | Nitrate: ${r.parameters.Nitrate} | Fecal Coliform: ${
          r.parameters.FecalColiform
        }`
      );
    doc.moveDown(0.5);
  });

  doc.end();
});

// 1. GET all monitored locations
// Route: /api/water/locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await WaterQuality.distinct("location");
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. GET last 10 days + 3-day forecast for a specific location
// Route: /api/water/:location
router.get("/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const data = await WaterQuality.find({ location })
      .sort({ date: -1 })
      .limit(10);
    res.json(data.reverse()); // oldest first for charts
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. GET alerts if any parameter crosses thresholds
router.get("/alerts", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); // disable caching completely

    const threshold = {
      DO: 5,
      BOD: 3,
      Nitrate: 10,
      FecalColiform: 500,
    };

    console.log("Fetching latest 50 records...");
    const records = await WaterQuality.find().sort({ date: -1 });
    console.log("Records fetched:", records.length);

    const alerts = await WaterQuality.find({
      $or: [
        { "parameters.DO": { $lt: 5 } },
        { "parameters.BOD": { $gt: 3 } },
        { "parameters.Nitrate": { $gt: 10 } },
        { "parameters.FecalColiform": { $gt: 500 } },
      ],
    })
      .sort({ date: -1 })
      .limit(50);

    console.log("Total alerts:", alerts.length);
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/latest", async (req, res) => {
  try {
    const locations = await WaterQuality.distinct("location");
    const result = await Promise.all(
      locations.map(async (loc) => {
        const latest = await WaterQuality.find({ location: loc })
          .sort({ date: -1 })
          .limit(1);
        return latest[0];
      })
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route: /api/water/alerts-count
router.get("/alerts-count", async (req, res) => {
  try {
    const threshold = { DO: 5, BOD: 3, Nitrate: 10, FecalColiform: 500 };
    const alerts = await WaterQuality.find({
      $or: [
        { "parameters.DO": { $lt: threshold.DO } },
        { "parameters.BOD": { $gt: threshold.BOD } },
        { "parameters.Nitrate": { $gt: threshold.Nitrate } },
        { "parameters.FecalColiform": { $gt: threshold.FecalColiform } },
      ],
    });
    const counts = alerts.reduce((acc, alert) => {
      acc[alert.location] = (acc[alert.location] || 0) + 1;
      return acc;
    }, {});
    res.json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 4. GET latest parameter summary for selected location
router.get("/summary/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const latest = await WaterQuality.find({ location })
      .sort({ date: -1 })
      .limit(1);

    if (!latest || latest.length === 0) {
      return res.json({ message: "No data" });
    }

    res.json(latest[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
