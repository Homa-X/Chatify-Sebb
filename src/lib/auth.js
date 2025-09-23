import api, { getCSRF } from "./api";
import { jwtDecode } from "jwt-decode"; // ✅ named export

export async function register(user) {
  await getCSRF();
  const res = await api.post("/auth/register", user);
  return res.data;
}

export async function login(user) {
  await getCSRF();
  const res = await api.post("/auth/token", user);
  const token = res.data.token;

  // decode token
  const decoded = jwtDecode(token);

  // persist
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(decoded));

  return decoded;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (!token || !user) return null;
  return JSON.parse(user);
}
