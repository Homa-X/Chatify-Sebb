import axios from "axios";

const api = axios.create({
  baseURL: "https://chatify-api.up.railway.app",
  withCredentials: true,
});

// Attach Authorization if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// CSRF: fetch token AND attach as header for subsequent protected requests
export async function getCSRF() {
  const res = await api.patch("/csrf");
  const token =
    res.data?.csrfToken ||
    res.headers["x-csrf-token"] ||
    res.headers["X-CSRF-Token"];
  if (token) {
    api.defaults.headers.common["X-CSRF-Token"] = token;
  }
  return token;
}

export default api;
