const mongoose = require("mongoose");

const waterQualitySchema = new mongoose.Schema({
  location: String, // e.g., Varanasi
  date: Date,
  parameters: {
    DO: Number,
    BOD: Number,
    Nitrate: Number,
    FecalColiform: Number,
  },
  forecast: {
    DO: Number,
    BOD: Number,
    Nitrate: Number,
    FecalColiform: Number,
  },
});

module.exports = mongoose.model("WaterQuality", waterQualitySchema);
