import { Navigate, Outlet } from "react-router-dom";

const Guard = () => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default Guard;