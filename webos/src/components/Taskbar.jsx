import { hyperApps, modeInfo } from "../data/apps";

export default function Taskbar({
  activeMode,
  openWindowIds,
  minimizedWindowIds,
  onStartClick,
  onAppClick,
}) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer className="taskbar">
      <button className="taskbar-start" onClick={onStartClick}>
        <span>{modeInfo[activeMode].emoji}</span>
        Start
      </button>

      <div className="taskbar-running-apps">
        {openWindowIds.map((appId) => {
          const app = hyperApps.find((item) => item.id === appId);

          return (
            <button
              key={appId}
              className={minimizedWindowIds.includes(appId) ? "task-minimized" : ""}
              onClick={() => onAppClick(appId)}
              title={app?.title}
            >
              <img src={app?.icon} alt={app?.title} />
            </button>
          );
        })}
      </div>

      <div className="taskbar-status">
        <span>{modeInfo[activeMode].label}</span>
        <strong>{currentTime}</strong>
      </div>
    </footer>
  );
}