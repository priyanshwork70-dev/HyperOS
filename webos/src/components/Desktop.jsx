import { useState } from "react";
import Taskbar from "./Taskbar";
import Window from "./Window";
import StartMenu from "./StartMenu";

import NotesApp from "../apps/NotesApp";
import CalculatorApp from "../apps/CalculatorApp";
import TodoApp from "../apps/TodoApp";
import SettingsApp from "../apps/SettingsApp";
import TerminalApp from "../apps/TerminalApp";


import { apps } from "../data/apps";

export default function Desktop({ user }) {
  const [openApps, setOpenApps] = useState([]);
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const openApp = (id) => {
    if (!openApps.includes(id)) {
      setOpenApps([...openApps, id]);
    }

    setMinimizedApps(minimizedApps.filter((appId) => appId !== id));
    setStartOpen(false);
  };

  const closeApp = (id) => {
    setOpenApps(openApps.filter((appId) => appId !== id));
    setMinimizedApps(minimizedApps.filter((appId) => appId !== id));
  };

  const minimizeApp = (id) => {
    if (!minimizedApps.includes(id)) {
      setMinimizedApps([...minimizedApps, id]);
    }
  };

  const toggleApp = (id) => {
    if (minimizedApps.includes(id)) {
      setMinimizedApps(minimizedApps.filter((appId) => appId !== id));
    } else {
      minimizeApp(id);
    }
  };

  const renderApp = (id) => {
    switch (id) {
      case "notes":
        return <NotesApp />;
      case "calc":
        return <CalculatorApp />;
      case "todo":
        return <TodoApp />;
      case "settings":
        return <SettingsApp theme={theme} setTheme={setTheme} />;
      case "terminal":
        return <TerminalApp openApp={openApp} user={user} />;
      
      default:
        return <p>App not found</p>;
    }
  };

  return (
    <div className={`desktop ${theme}`}>
      <h3 className="welcome-text">Welcome, {user}</h3>

      <div className="desktop-icons">
        {apps.map((app) => (
          <button
            key={app.id}
            className="app-icon"
            onDoubleClick={() => openApp(app.id)}
            onClick={() => openApp(app.id)}
          >
            <img src={app.icon} alt={app.name} />
            <p>{app.name}</p>
          </button>
        ))}
      </div>

      {openApps.map((appId, index) => {
        const app = apps.find((a) => a.id === appId);
        if (minimizedApps.includes(appId)) return null;

        return (
          <Window
            key={appId}
            title={app?.name || appId}
            onClose={() => closeApp(appId)}
            onMinimize={() => minimizeApp(appId)}
            offset={index}
          >
            {renderApp(appId)}
          </Window>
        );
      })}

      {startOpen && <StartMenu openApp={openApp} />}

      <Taskbar
        onStartClick={() => setStartOpen(!startOpen)}
        openApps={openApps}
        minimizedApps={minimizedApps}
        onAppClick={toggleApp}
      />
    </div>
  );
}