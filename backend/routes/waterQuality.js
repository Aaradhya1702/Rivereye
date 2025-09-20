const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const WaterQuality = require("../models/WaterQuality");

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
// /api/water/alerts
router.get("/alerts", async (req, res) => {
  try {
    const threshold = {
      DO: 5,
      BOD: 3,
      Nitrate: 10,
      FecalColiform: 500,
    };

    // get latest 50 records (enough to test)
    const records = await WaterQuality.find().sort({ date: -1 }).limit(50);

    // filter manually in JS
    const alerts = records.filter((r) => {
      const DO = Number(r.parameters.DO);
      const BOD = Number(r.parameters.BOD);
      const Nitrate = Number(r.parameters.Nitrate);
      const FecalColiform = Number(r.parameters.FecalColiform);

      return (
        DO < threshold.DO ||
        BOD > threshold.BOD ||
        Nitrate > threshold.Nitrate ||
        FecalColiform > threshold.FecalColiform
      );
    });

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
