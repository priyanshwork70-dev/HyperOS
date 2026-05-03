import { useMemo, useState } from "react";
import { hyperApps, modeInfo } from "../data/apps";

import StartMenu from "./StartMenu";
import Taskbar from "./Taskbar";
import Window from "./Window";

import FileManagerApp from "../apps/FileManagerApp";
import CalculatorApp from "../apps/CalculatorApp";
import SettingsApp from "../apps/SettingsApp";
import MusicApp from "../apps/MusicApp";
import NotesApp from "../apps/NotesApp";
import ClockApp from "../apps/ClockApp";
import TerminalApp from "../apps/TerminalApp";
import TodoApp from "../apps/TodoApp";

import studentWall from "../assets/wallpaper/student.jpg";
import devWall from "../assets/wallpaper/dev.jpg";
import casualWall from "../assets/wallpaper/casual.jpg";

const defaultModeTheme = {
  student: {
    wallpaper: `url(${studentWall})`,
    accent: "#2563eb",
  },
  developer: {
    wallpaper: `url(${devWall})`,
    accent: "#22c55e",
  },
  casual: {
    wallpaper: `url(${casualWall})`,
    accent: "#ec4899",
  },
};

export default function Desktop({ userName, onLogout }) {
  const [activeMode, setActiveMode] = useState("student");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [openWindowIds, setOpenWindowIds] = useState([]);
  const [minimizedWindowIds, setMinimizedWindowIds] = useState([]);

  const [modeTheme, setModeTheme] = useState(() => {
    const savedTheme = localStorage.getItem("hyperos:modeTheme");

    if (!savedTheme) return defaultModeTheme;

    try {
      return JSON.parse(savedTheme);
    } catch {
      return defaultModeTheme;
    }
  });

  const visibleApps = useMemo(() => {
    return hyperApps.filter((app) => app.modes.includes(activeMode));
  }, [activeMode]);

  const updateModeTheme = (mode, changes) => {
    setModeTheme((oldTheme) => {
      const newTheme = {
        ...oldTheme,
        [mode]: {
          ...oldTheme[mode],
          ...changes,
        },
      };

      localStorage.setItem("hyperos:modeTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const resetModeTheme = (mode) => {
    setModeTheme((oldTheme) => {
      const newTheme = {
        ...oldTheme,
        [mode]: defaultModeTheme[mode],
      };

      localStorage.setItem("hyperos:modeTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const openApp = (appId) => {
    if (!openWindowIds.includes(appId)) {
      setOpenWindowIds((oldIds) => [...oldIds, appId]);
    }

    setMinimizedWindowIds((oldIds) => oldIds.filter((id) => id !== appId));
    setStartMenuOpen(false);
  };

  const closeApp = (appId) => {
    setOpenWindowIds((oldIds) => oldIds.filter((id) => id !== appId));
    setMinimizedWindowIds((oldIds) => oldIds.filter((id) => id !== appId));
  };

  const minimizeApp = (appId) => {
    if (!minimizedWindowIds.includes(appId)) {
      setMinimizedWindowIds((oldIds) => [...oldIds, appId]);
    }
  };

  const toggleFromTaskbar = (appId) => {
    if (minimizedWindowIds.includes(appId)) {
      setMinimizedWindowIds((oldIds) => oldIds.filter((id) => id !== appId));
    } else {
      minimizeApp(appId);
    }
  };

  const switchMode = (newMode) => {
    setActiveMode(newMode);
    setStartMenuOpen(false);

    const allowedAppIds = hyperApps
      .filter((app) => app.modes.includes(newMode))
      .map((app) => app.id);

    setOpenWindowIds((oldIds) =>
      oldIds.filter((id) => allowedAppIds.includes(id))
    );

    setMinimizedWindowIds((oldIds) =>
      oldIds.filter((id) => allowedAppIds.includes(id))
    );
  };

  const renderAppContent = (appId) => {
    if (appId === "files") return <FileManagerApp />;

    if (appId === "calculator") return <CalculatorApp />;
    if (appId === "notes") return <NotesApp />;
    if (appId === "clock") return <ClockApp />;
    if (appId === "todo") return <TodoApp />;
    if (appId === "terminal") {
  return <TerminalApp openApp={openApp} />;
}

    if (appId === "settings") {
      return (
        <SettingsApp
          activeMode={activeMode}
          modeTheme={modeTheme}
          updateModeTheme={updateModeTheme}
          resetModeTheme={resetModeTheme}
        />
      );
    }

    if (appId === "music") return <MusicApp />;

    return (
      <div className="coming-soon-app">
        <h2>{hyperApps.find((app) => app.id === appId)?.title}</h2>
        <p>Abhi app ka bas canvas bana h app ban rhi h</p>
      </div>
    );
  };

  return (
    <main
      className={`desktop ${activeMode}`}
      style={{
        backgroundImage: modeTheme[activeMode].wallpaper,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "--accent-color": modeTheme[activeMode].accent,
      }}
    >
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
        <p>Welcome Malik</p>
        <h3>{userName}</h3>
        <span>
          {modeInfo[activeMode].emoji} {modeInfo[activeMode].label} Mode
        </span>
      </section>

      <section className="desktop-icons">
        {visibleApps.map((app) => (
          <button
            key={app.id}
            className="desktop-icon"
            onClick={() => openApp(app.id)}
          >
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
        onStartClick={() => setStartMenuOpen((oldValue) => !oldValue)}
        onAppClick={toggleFromTaskbar}
      />
    </main>
  );
}