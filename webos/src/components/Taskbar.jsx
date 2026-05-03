import { hyperApps, modeInfo } from "../data/apps";
import windowIcon from "../assets/icons/window.png";

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

  const today = new Date().toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  });

  return (
    <footer className="taskbar">
     <button className="taskbar-start" onClick={onStartClick}>
  <img src={windowIcon} alt="HyperOS" />
  <strong>HyperOS</strong>
</button>

      <div className="taskbar-dock">
        {openWindowIds.length === 0 ? (
          <span className="dock-empty">No apps running</span>
        ) : (
          openWindowIds.map((appId) => {
            const app = hyperApps.find((item) => item.id === appId);
            const isMinimized = minimizedWindowIds.includes(appId);

            return (
              <button
                key={appId}
                className={isMinimized ? "dock-app minimized-app" : "dock-app"}
                onClick={() => onAppClick(appId)}
                title={app?.title}
              >
                <img src={app?.icon} alt={app?.title} />
                <span>{app?.title}</span>
              </button>
            );
          })
        )}
      </div>

      <div className="taskbar-right">
        <div className="mode-chip">
          {modeInfo[activeMode].emoji} {modeInfo[activeMode].label}
        </div>

        <div className="taskbar-clock">
          <strong>{currentTime}</strong>
          <span>{today}</span>
        </div>
      </div>
    </footer>
  );
}