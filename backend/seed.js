// backend/seed.js
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const WaterQuality = require("./models/WaterQuality");

async function seed() {
  try {
    // connect to DB
    await connectDB();

    // clear existing collection (optional)
    await WaterQuality.deleteMany({});
    console.log("Cleared WaterQuality collection");

    // load JSON
    const filePath = path.join(__dirname, "data", "mockData.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const arr = JSON.parse(raw);

    // convert date strings to Date objects (important)
    const docs = arr.map((item) => ({
      location: item.location,
      date: item.date ? new Date(item.date) : new Date(),
      parameters: item.parameters || {},
      forecast: item.forecast || {},
    }));

    const inserted = await WaterQuality.insertMany(docs);
    console.log(`Inserted ${inserted.length} documents into WaterQuality`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error", err);
    process.exit(1);
  }
}

seed();
