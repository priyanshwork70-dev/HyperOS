import { useState } from "react";
import { modeInfo } from "../data/apps";

export default function StartMenu({
  userName,
  activeMode,
  apps,
  onOpenApp,
  onSwitchMode,
  onLogout,
}) {
  const [searchText, setSearchText] = useState("");

  const searchedApps = apps.filter((app) =>
    app.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="start-menu">
      <div className="start-profile">
        <div className="start-avatar">{userName.charAt(0).toUpperCase()}</div>

        <div>
          <h3>{userName}</h3>
          <p>{modeInfo[activeMode].label} workspace</p>
        </div>
      </div>

      <input
        value={searchText}
        placeholder="Search apps..."
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="start-mode-row">
        {Object.entries(modeInfo).map(([modeKey, mode]) => (
          <button
            key={modeKey}
            className={activeMode === modeKey ? "active-start-mode" : ""}
            onClick={() => onSwitchMode(modeKey)}
          >
            {mode.emoji}
          </button>
        ))}
      </div>

      <div className="start-app-list">
        {searchedApps.map((app) => (
          <button key={app.id} onClick={() => onOpenApp(app.id)}>
            <img src={app.icon} alt={app.title} />
            <span>{app.title}</span>
          </button>
        ))}
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </section>
  );
}