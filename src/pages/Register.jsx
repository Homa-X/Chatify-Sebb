import { useState } from "react";
import { register } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ csrfToken }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", csrfToken: csrfToken });
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      await register(form);
      setMsg("Registration successful! Redirecting...");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error occurred");
    }
  }

  return (
    <section className="card">
      <h1>Register</h1>
      {msg && <div className="note">{msg}</div>}
      <form onSubmit={onSubmit} className="col">
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
