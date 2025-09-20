const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
    city: String,
    condition: String,
    temperature: Number,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Weather", weatherSchema);
