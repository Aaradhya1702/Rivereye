const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const nodemailer = require("nodemailer");

const User = require("./models/User");
const Weather = require("./models/Weather");

const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URI = "mongodb://localhost:27017/weatherAlerts";
const OPENWEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY"; // get from openweathermap.org

// Connect MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

// Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password"
    }
});

// Check weather and alert users
async function checkWeatherAndAlert() {
    try {
        const users = await User.find(); // get all users

        for (const user of users) {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );

            const weatherCondition = res.data.weather[0].main;
            const temp = res.data.main.temp;

            // Save/update weather in MongoDB
            await Weather.findOneAndUpdate(
                { city: user.city },
                { condition: weatherCondition, temperature: temp, updatedAt: new Date() },
                { upsert: true }
            );

            // If weather is bad, send alert
            if (["Rain", "Storm", "Snow", "Thunderstorm"].includes(weatherCondition)) {
                await transporter.sendMail({
                    from: "jainaaradhya78@gmail.com",
                    to: user.email,
                    subject: `Weather Alert for ${user.city}`,
                    text: `Alert! Current weather in ${user.city} is ${weatherCondition} with temperature ${temp}°C`
                });
                console.log(`Alert sent to ${user.email} for ${user.city}`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// Check weather every 30 minutes
setInterval(checkWeatherAndAlert, 30 * 60 * 1000);

// Test route
app.get("/", (req, res) => res.send("Weather Alert System Running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
