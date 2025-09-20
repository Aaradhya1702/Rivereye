const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const waterQualityRoutes = require("./routes/waterQuality");
const authRoutes = require("./routes/auth"); // new

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/water", waterQualityRoutes);
app.use("/api/auth", authRoutes); // auth routes

app.get("/", (req, res) => res.send("Ganga Water Quality API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
