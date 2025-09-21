const mongoose = require("mongoose");

const waterLevelSchema = new mongoose.Schema({
  location: String,
  date: Date,
  parameters: {
    WaterLevel: Number, // <- THIS IS THE KEY
  },
  forecast: {
    WaterLevel: Number,
  },
});

module.exports = mongoose.model("WaterLevel", waterLevelSchema);
