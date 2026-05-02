import { apps } from "../data/apps";

export default function Taskbar({
  onStartClick,
  openApps,
  minimizedApps,
  onAppClick,
}) {
  const time = new Date().toLocaleTimeString();

  return (
    <div className="taskbar">
      <button className="start-btn" onClick={onStartClick}>
        Start
      </button>

      <div className="taskbar-apps">
        {openApps.map((id) => {
          const app = apps.find((a) => a.id === id);

          return (
            <div
              key={id}
              className={`taskbar-item ${
                minimizedApps.includes(id) ? "minimized" : ""
              }`}
              onClick={() => onAppClick(id)}
              title={app?.name}
            >
              <img src={app.icon} alt={app.name} />
            </div>
          );
        })}
      </div>

      <span className="clock">{time}</span>
    </div>
  );
}