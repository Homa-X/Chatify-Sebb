import { useState } from "react";
import api, { getCSRF } from "../lib/api";
import { logout, getUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();
  const current = getUser();
  const [form, setForm] = useState({
    username: current?.username || "",
    email: current?.email || "",
    avatar: current?.avatar || "",
  });
  const [msg, setMsg] = useState("");

  async function refreshUser() {
    const res = await api.get(`/users/${current.id}`);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }

  async function updateUser(e) {
    e.preventDefault();
    setMsg("");
    try {
      await getCSRF();
      await api.put("/user", form);
      const fresh = await refreshUser();
      setForm({
        username: fresh.username || "",
        email: fresh.email || "",
        avatar: fresh.avatar || "",
      });
      setMsg("Profile updated!");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Update failed.");
    }
  }

  async function deleteUser() {
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      await getCSRF();
      await api.delete(`/users/${current.id}`);
    } finally {
      logout();
      nav("/login");
    }
  }

  return (
    <section className="card">
      <h1>Profile</h1>
      {msg && <div className="note">{msg}</div>}
      <form onSubmit={updateUser}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
        />
        {form.avatar && (
          <img
            src={form.avatar}
            alt="Preview"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              margin: "1rem 0",
              objectFit: "cover",
            }}
          />
        )}
        <button type="submit">Save</button>
      </form>
      <button
        onClick={deleteUser}
        style={{ background: "red", marginTop: "1rem" }}
      >
        Delete Account
      </button>
    </section>
  );
}
