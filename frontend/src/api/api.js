import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getLocations = () => axios.get(`${API_URL}/water/locations`);
export const getLocationData = (location) =>
  axios.get(`${API_URL}/water/${location}`);
export const getAlerts = () => axios.get(`${API_URL}/water/alerts`);
