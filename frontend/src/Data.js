import svg1 from "./images/svg-1.svg";
import svg2 from "./images/svg-2.svg";
import profile from "./images/ganga.jpg";
// import profile from "./images/profile.jpg";
import svg3 from "./images/svg-3.svg";

export const homeObjOne = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "Real-time Monitoring",
  headline: "Track Ganga River Water Quality with Live Updates",
  description:
    "Our platform provides real-time insights into water quality parameters like DO, BOD, nitrate, and coliform levels across key river locations.",
  buttonLabel: "View Dashboard",
  imgStart: "",
  img: svg1,
  alt: "River Monitoring",
  start: "",
};

export const homeObjTwo = {
  primary: true,
  lightBg: true,
  lightTopLine: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Forecasting",
  headline: "3-Day Forecast for Pollution Trends",
  description:
    "Stay ahead with short-term forecasts that predict water quality changes and help authorities take preventive action.",
  buttonLabel: "Explore Forecast",
  imgStart: "start",
  img: svg2,
  alt: "Forecast Chart",
  start: "true",
};

export const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: "Community Impact",
  headline: "Empowering Citizens and Authorities with Actionable Insights",
  description:
    "Our system ensures the public, NGOs, and policymakers can access reliable water data to promote sustainable river management.",
  buttonLabel: "Learn More",
  imgStart: "",
  img: svg3,
  alt: "Community Engagement",
  start: "",
};

export const homeObjFour = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "Smart Alerts",
  headline: "Get Notified When Pollution Levels Rise",
  description:
    "Receive instant alerts when critical water quality thresholds are crossed, ensuring rapid response to environmental risks.",
  buttonLabel: "Get Alerts",
  imgStart: "start",
  img: profile,
  alt: "Alert Notification",
  start: "true",
};
