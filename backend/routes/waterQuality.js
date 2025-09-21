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

router.get("/city-comparison", async (req, res) => {
  try {
    const records = await WaterQuality.find().sort({ date: 1 });

    if (!records.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const cityData = {};

    records.forEach((r) => {
      const city = r.location || "Unknown";
      const params = r.parameters || {};
      if (!cityData[city]) {
        cityData[city] = {
          count: 0,
          DO: 0,
          BOD: 0,
          Nitrate: 0,
          FecalColiform: 0,
        };
      }
      cityData[city].count += 1;
      cityData[city].DO += Number(params.DO || 0);
      cityData[city].BOD += Number(params.BOD || 0);
      cityData[city].Nitrate += Number(params.Nitrate || 0);
      cityData[city].FecalColiform += Number(params.FecalColiform || 0);
    });

    const result = Object.keys(cityData).map((city) => ({
      city,
      DO: (cityData[city].DO / cityData[city].count).toFixed(2),
      BOD: (cityData[city].BOD / cityData[city].count).toFixed(2),
      Nitrate: (cityData[city].Nitrate / cityData[city].count).toFixed(2),
      FecalColiform: (
        cityData[city].FecalColiform / cityData[city].count
      ).toFixed(2),
    }));

    res.json({ comparison: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Forecast next 3 days for all parameters
router.get("/forecast-multi/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // Fetch last 15 days of data
    const data = await WaterQuality.find({ location })
      .sort({ date: -1 })
      .limit(15);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for this location" });
    }

    const parameters = ["DO", "BOD", "Nitrate", "FecalColiform"];

    // Prepare forecast object
    const forecast = {};
    parameters.forEach((param) => {
      const x = data.map((d, i) => i + 1); // day index
      const y = data.map((d) => Number(d.parameters[param] ?? 0));

      const regression = new MLR(x, y);

      forecast[param] = [];
      for (let i = x.length + 1; i <= x.length + 3; i++) {
        forecast[param].push({
          day: i,
          predicted: Number(regression.predict(i).toFixed(2)),
        });
      }
    });

    res.json({
      location,
      forecast,
      lastData: data.reverse(), // chronological order
    });
  } catch (err) {
    console.error(err);
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

    const threshold = { DO: 5, BOD: 3, Nitrate: 10, FecalColiform: 500 };
    console.log("Fetching alerts for thresholds:", threshold);

    const alerts = await WaterQuality.find().sort({ date: -1 }).limit(50);
    const filtered = alerts.filter((r) => {
      const p = r.parameters || {};
      return (
        Number(p.DO) < threshold.DO ||
        Number(p.BOD) > threshold.BOD ||
        Number(p.Nitrate) > threshold.Nitrate ||
        Number(p.FecalColiform) > threshold.FecalColiform
      );
    });
    console.log("Filtered alerts count:", filtered.length);
    res.json(filtered);
  } catch (err) {
    console.error("Error in /alerts:", err.message);
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
