import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: false, 
});

api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("token");
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
  return config;
});

export async function getCSRF() { return true; }
export async function ensureCSRF() { return true; }

export default api;
