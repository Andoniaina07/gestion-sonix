import axios from "axios";

export const apiURL = "https://api.soniksmada.com/api";

const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

