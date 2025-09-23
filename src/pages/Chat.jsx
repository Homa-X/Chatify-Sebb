import { useEffect, useState } from "react";
import api, { getCSRF } from "../lib/api";
import DOMPurify from "dompurify";
import { getUser } from "../lib/auth";

const PRESET_CONVS = [
  { id: "5a430141-8064-4388-ab65-9161a245a3f4", name: "General" },
  { id: "9b4d0e1b-b1d2-4f1a-9f0a-0f2e9a2e1c77", name: "Random" },
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conv, setConv] = useState(PRESET_CONVS[0].id);
  const user = getUser();

  async function loadMessages(cid = conv) {
    const res = await api.get(`/messages`, { params: { conversationId: cid } });
    setMessages(res.data);
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const clean = DOMPurify.sanitize(text);
    await getCSRF();
    await api.post("/messages", { text: clean, conversationId: conv });
    setText("");
    loadMessages();
  }

  async function deleteMessage(id) {
    await getCSRF();
    await api.delete(`/messages/${id}`);
    loadMessages();
  }

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conv]);

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h1>Chat</h1>

      {/* Conversation switcher */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {PRESET_CONVS.map((c) => (
          <button
            key={c.id}
            onClick={() => setConv(c.id)}
            style={{
              background: conv === c.id ? "#111827" : "#4f46e5",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ maxHeight: 320, overflowY: "auto", padding: "0.5rem" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.userId === user.id ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>{msg.username}</div>
            <div>{msg.text}</div>
            {msg.userId === user.id && (
              <button onClick={() => deleteMessage(msg.id)} style={{ marginTop: 4 }}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Composer */}
      <form onSubmit={sendMessage} style={{ marginTop: "1rem" }}>
        <input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
