import { useMemo, useState } from "react";
import { hyperApps, modeInfo } from "../data/apps";
import StartMenu from "./StartMenu";
import Taskbar from "./Taskbar";
import Window from "./Window";
import FileManagerApp from "../apps/FileManagerApp";

export default function Desktop({ userName, onLogout }) {
  const [activeMode, setActiveMode] = useState("student");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [openWindowIds, setOpenWindowIds] = useState([]);
  const [minimizedWindowIds, setMinimizedWindowIds] = useState([]);

  const visibleApps = useMemo(() => {
    return hyperApps.filter((app) => app.modes.includes(activeMode));
  }, [activeMode]);

  const openApp = (appId) => {
    if (!openWindowIds.includes(appId)) {
      setOpenWindowIds((prev) => [...prev, appId]);
    }

    setMinimizedWindowIds((prev) => prev.filter((id) => id !== appId));
    setStartMenuOpen(false);
  };

  const closeApp = (appId) => {
    setOpenWindowIds((prev) => prev.filter((id) => id !== appId));
    setMinimizedWindowIds((prev) => prev.filter((id) => id !== appId));
  };

  const minimizeApp = (appId) => {
    if (!minimizedWindowIds.includes(appId)) {
      setMinimizedWindowIds((prev) => [...prev, appId]);
    }
  };

  const toggleFromTaskbar = (appId) => {
    if (minimizedWindowIds.includes(appId)) {
      setMinimizedWindowIds((prev) => prev.filter((id) => id !== appId));
    } else {
      minimizeApp(appId);
    }
  };

  const switchMode = (newMode) => {
    setActiveMode(newMode);
    setStartMenuOpen(false);

    const allowedIds = hyperApps
      .filter((app) => app.modes.includes(newMode))
      .map((app) => app.id);

    setOpenWindowIds((prev) => prev.filter((id) => allowedIds.includes(id)));
    setMinimizedWindowIds((prev) => prev.filter((id) => allowedIds.includes(id)));
  };

  const renderAppContent = (appId) => {
    if (appId === "files") return <FileManagerApp />;
    return (
      <div className="coming-soon-app">
        <h2>{hyperApps.find((app) => app.id === appId)?.title}</h2>
        <p>This app shell is ready. We will build its full features next.</p>
      </div>
    );
  };

  return (
    <main className={`desktop ${activeMode}`}>
      <section className="desktop-topbar">
        <div>
          <h1>HyperOS</h1>
          <p>{modeInfo[activeMode].tagline}</p>
        </div>

        <div className="mode-switcher">
          {Object.entries(modeInfo).map(([modeKey, mode]) => (
            <button
              key={modeKey}
              className={activeMode === modeKey ? "selected-mode" : ""}
              onClick={() => switchMode(modeKey)}
            >
              <span>{mode.emoji}</span>
              {mode.label}
            </button>
          ))}
        </div>
      </section>

      <section className="desktop-user-card">
        <p>Signed in as</p>
        <h3>{userName}</h3>
        <span>{modeInfo[activeMode].emoji} {modeInfo[activeMode].label} Mode</span>
      </section>

      <section className="desktop-icons">
        {visibleApps.map((app) => (
          <button key={app.id} className="desktop-icon" onClick={() => openApp(app.id)}>
            <img src={app.icon} alt={app.title} />
            <span>{app.title}</span>
          </button>
        ))}
      </section>

      {openWindowIds.map((appId, index) => {
        if (minimizedWindowIds.includes(appId)) return null;

        const app = hyperApps.find((item) => item.id === appId);

        return (
          <Window
            key={appId}
            title={app?.title || appId}
            offset={index}
            onClose={() => closeApp(appId)}
            onMinimize={() => minimizeApp(appId)}
          >
            {renderAppContent(appId)}
          </Window>
        );
      })}

      {startMenuOpen && (
        <StartMenu
          userName={userName}
          activeMode={activeMode}
          apps={visibleApps}
          onOpenApp={openApp}
          onSwitchMode={switchMode}
          onLogout={onLogout}
        />
      )}

      <Taskbar
        activeMode={activeMode}
        openWindowIds={openWindowIds}
        minimizedWindowIds={minimizedWindowIds}
        onStartClick={() => setStartMenuOpen((prev) => !prev)}
        onAppClick={toggleFromTaskbar}
      />
    </main>
  );
}