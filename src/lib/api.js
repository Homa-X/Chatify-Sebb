import axios from "axios";

const api = axios.create({
  baseURL: "https://chatify-api.up.railway.app",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export async function getCSRF() {
  const res = await api.patch("/csrf");
  return res.data.csrfToken;
}

export default api;