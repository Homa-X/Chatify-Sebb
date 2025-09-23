import axios from "axios";

// Same-origin proxy on Netlify (via netlify.toml). Allow override via VITE_API_URL.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  xsrfCookieName: "csrfToken",
  xsrfHeaderName: "X-CSRF-Token",
});

api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("token");
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
  return config;
});

function getCookie(name) {
  const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCsrfHeader(token) {
  if (!token) return;
  api.defaults.headers.common["X-CSRF-Token"] = token;
  api.defaults.headers.common["x-csrf-token"] = token;
  api.defaults.headers.common["CSRF-Token"] = token;
}

export async function getCSRF() {
  const res = await api.patch("/csrf");
  const token =
    res.data?.csrfToken ||
    res.headers["x-csrf-token"] ||
    res.headers["csrf-token"] ||
    getCookie("csrfToken");
  setCsrfHeader(token);
  return token;
}

export async function ensureCSRF() {
  const has =
    api.defaults.headers.common["X-CSRF-Token"] ||
    api.defaults.headers.common["x-csrf-token"] ||
    api.defaults.headers.common["CSRF-Token"];
  if (!has) await getCSRF();
}

export default api;
