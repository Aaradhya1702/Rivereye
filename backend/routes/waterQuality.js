const express = require("express");
const router = express.Router();
const WaterQuality = require("../models/WaterQuality");

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

module.exports = router;
