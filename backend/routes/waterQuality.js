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
// Route: /api/water/alerts
router.get("/alerts", async (req, res) => {
  try {
    const threshold = {
      DO: 5,
      BOD: 3,
      Nitrate: 10,
      FecalColiform: 500,
    };
    const alerts = await WaterQuality.find({
      $or: [
        { "parameters.DO": { $lt: threshold.DO } },
        { "parameters.BOD": { $gt: threshold.BOD } },
        { "parameters.Nitrate": { $gt: threshold.Nitrate } },
        { "parameters.FecalColiform": { $gt: threshold.FecalColiform } },
      ],
    }).sort({ date: -1 });
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
