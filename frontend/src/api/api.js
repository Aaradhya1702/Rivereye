import axios from "axios";
const API_URL = "http://localhost:5000/api/water";

export const getLocations = () => axios.get(`${API_URL}/locations`);
export const getLocationData = (location) =>
  axios.get(`${API_URL}/${location}`);
export const getAlerts = () => axios.get(`${API_URL}/alerts`);
