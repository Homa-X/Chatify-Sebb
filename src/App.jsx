import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SideNav from "./components/SideNav";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="app">
      {isLoggedIn && <SideNav />}
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </>
        )}
      </Routes>
    </div>
  );
}
