import { Link, useNavigate } from "react-router-dom";
import { logout, getUser } from "../lib/auth";

export default function SideNav({ setIsLoggedIn }) {
  const nav = useNavigate();
  const user = getUser();

  function doLogout() {
    logout();
    setIsLoggedIn(false);
    nav("/login");
  }

  return (
    <aside
      style={{
        width: "200px",
        background: "#111827",
        color: "white",
        padding: "1rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        {user?.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: "80px", borderRadius: "50%" }}
          />
        )}
        <h3>{user?.username}</h3>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link to="/profile" style={{ color: "white" }}>
          Profile
        </Link>
        <Link to="/chat" style={{ color: "white" }}>
          Chat
        </Link>
        <button onClick={doLogout} style={{ marginTop: "2rem" }}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
