import { useState, useEffect } from "react";
import { login } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ csrfToken, setIsLoggedIn }) {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    csrfToken: csrfToken
  });
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      await login(form);
      setIsLoggedIn(true);
      nav("/chat");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <section className="card">
      <h1>Log in</h1>
      {msg && <div className="note">{msg}</div>}
      <form onSubmit={onSubmit} className="col">
        <input
          placeholder="Username"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Log in</button>
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
