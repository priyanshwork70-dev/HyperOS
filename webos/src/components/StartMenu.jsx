import { useState } from "react";
import { apps } from "../data/apps";

export default function StartMenu({ openApp }) {
  const [search, setSearch] = useState("");

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="start-menu">
      <h3>NexOS Start</h3>

      <input
        className="start-search"
        placeholder="Search apps..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="start-apps">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            className="start-app-item"
            onClick={() => openApp(app.id)}
          >
            <img src={app.icon} alt={app.name} />
            <span>{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}