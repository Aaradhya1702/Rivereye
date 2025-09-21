import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  if (res.status === 200) {
    // Save login state in session storage
    sessionStorage.setItem("user", JSON.stringify({ email: data.email }));
  }
  return res;
};

export const logout = () => {
  sessionStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Other API calls
export const getLocations = () => axios.get(`${API_URL}/water/locations`);
export const getLocationData = (location) =>
  axios.get(`${API_URL}/water/${location}`);
export const getAlerts = () => axios.get(`${API_URL}/water/alerts`);
export const getLatestStatus = async () => axios.get(`${API_URL}/latest`);
export const getSummary = (location) =>
  axios.get(`${API_URL}/water/summary/${location}`);
export const getAlertCounts = async () => axios.get(`${API_URL}/alerts-count`);
export const getMonthlyComparison = (location) =>
  axios.get(`${API_URL}/water/monthly-comparison/${location}`);
