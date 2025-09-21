require("dotenv").config();
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const WaterLevel = require("./models/WaterLevel");
const WaterQuality = require("./models/WaterQuality");

async function seed() {
  try {
    // Connect to DB
    await connectDB();

    // Clear existing collections
    await WaterLevel.deleteMany({});
    await WaterQuality.deleteMany({});
    console.log("Cleared WaterLevel and WaterQuality collections");

    // ---- Seed WaterQuality ----
    const qualityPath = path.join(__dirname, "data", "mockData.json");
    const qualityRaw = fs.readFileSync(qualityPath, "utf8");
    const qualityArr = JSON.parse(qualityRaw);

    const qualityDocs = qualityArr.map((item) => ({
      location: item.location,
      date: item.date ? new Date(item.date) : new Date(),
      parameters: item.parameters || {},
      forecast: item.forecast || {},
    }));

    const qualityInserted = await WaterQuality.insertMany(qualityDocs);
    console.log(
      `Inserted ${qualityInserted.length} documents into WaterQuality`
    );

    // ---- Seed WaterLevel ----
    const levelPath = path.join(__dirname, "data", "level.json");
    const levelRaw = fs.readFileSync(levelPath, "utf8");
    const levelArr = JSON.parse(levelRaw);

    // Map `waterLevel` to `WaterLevel` in parameters and forecast
    const levelDocs = levelArr.map((item) => ({
      location: item.location,
      date: item.date ? new Date(item.date) : new Date(),
      parameters: {
        WaterLevel: Number(item.parameters?.waterLevel || 0),
      },
      forecast: {
        WaterLevel: Number(item.forecast?.waterLevel || 0),
      },
    }));

    const levelInserted = await WaterLevel.insertMany(levelDocs);
    console.log(`Inserted ${levelInserted.length} documents into WaterLevel`);

    process.exit(0);
  } catch (err) {
    console.error("Seed error", err);
    process.exit(1);
  }
}

seed();
