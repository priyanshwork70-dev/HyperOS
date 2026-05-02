import { useState } from "react";

export default function LoginScreen({ previousUser, onLogin, onGuestLogin }) {
  const [nameInput, setNameInput] = useState(
    previousUser === "Guest" ? "" : previousUser
  );

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-logo">H</div>

        <h1>Welcome to HyperOS</h1>
        <p>A browser desktop that adapts to how you work.</p>

        <input
          value={nameInput}
          placeholder="Enter your name"
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onLogin(nameInput);
          }}
        />

        <button className="primary-login-btn" onClick={() => onLogin(nameInput)}>
          Enter Desktop
        </button>

        <button className="secondary-login-btn" onClick={onGuestLogin}>
          Continue as Guest
        </button>

        <div className="login-modes-preview">
          <span>🎓 Student</span>
          <span>💻 Developer</span>
          <span>🎧 Casual</span>
        </div>
      </section>
    </main>
  );
}