import { useState } from "react";

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="avatar">N</div>
        <h2>Welcome to NexOS</h2>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onLogin(name);
          }}
        />

        <button onClick={() => onLogin(name)}>Enter Desktop</button>
        <button className="guest-btn" onClick={() => onLogin("Guest")}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}