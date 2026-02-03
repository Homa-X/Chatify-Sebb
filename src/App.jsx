import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SideNav from "./components/SideNav";
import Guard from "./components/Guard";
import { getCSRF } from "./lib/api";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCSRF = async () => {
      const csrf = await getCSRF();
      setCsrfToken(csrf);
    };
    fetchCSRF();
  }, []);

  return (
    <div className="app">
      {csrfToken &&
        <>
          {isLoggedIn && <SideNav setIsLoggedIn={setIsLoggedIn} />}
          <Routes>
            <Route path="/login" element={<Login csrfToken={csrfToken} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register csrfToken={csrfToken} />} />

            <Route element={<Guard />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/chat" : "/login"} />}
            />
          </Routes>
        </>
      }
    </div>
  );
}
