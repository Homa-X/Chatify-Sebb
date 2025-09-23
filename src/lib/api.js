import axios from "axios";
const api = axios.create({ baseURL: "/api", withCredentials: false });
api.interceptors.request.use((cfg)=>{ const t=localStorage.getItem("token"); if(t) cfg.headers.Authorization=`Bearer ${t}`; return cfg;});
export async function getCSRF(){ return true; }
export async function ensureCSRF(){ return true; }
export default api;
