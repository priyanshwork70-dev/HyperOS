import { useRef } from "react";

import studentWall from "../assets/wallpaper/student.jpg";
import devWall from "../assets/wallpaper/dev.jpg";

import casualWall from "../assets/wallpaper/casual.jpg";

const modeLabels = {
  student: "Student Mode",
  developer: "Developer Mode",
  casual: "Casual Mode",
};

const defaultWallpapers = {
  student: `url(${studentWall})`,
  developer: `url(${devWall})`,
  casual: `url(${casualWall})`,
};

const accentOptions = {
  student: ["#2563eb", "#0ea5e9", "#16a34a"],
  developer: ["#22c55e", "#38bdf8", "#a855f7"],
  casual: ["#ec4899", "#f97316", "#8b5cf6"],
};

export default function SettingsApp({
  activeMode,
  modeTheme,
  updateModeTheme,
  resetModeTheme,
}) {
  const fileInputRef = useRef();

  const currentWallpaper = modeTheme[activeMode].wallpaper;
  const currentAccent = modeTheme[activeMode].accent;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateModeTheme(activeMode, {
        wallpaper: `url(${reader.result})`,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="settings-app">
      <div className="settings-header">
        <div>
          <h2>Settings</h2>
          <p>{modeLabels[activeMode]}</p>
        </div>

        <button onClick={() => resetModeTheme(activeMode)}>Reset</button>
      </div>

      {/* DEFAULT WALLPAPER */}
      <section className="settings-section">
        <h3>Default Wallpaper</h3>

        <button
          className="wallpaper-card selected-wallpaper"
          style={{
            backgroundImage: defaultWallpapers[activeMode],
            backgroundSize: "cover",
          }}
          onClick={() =>
            updateModeTheme(activeMode, {
              wallpaper: defaultWallpapers[activeMode],
            })
          }
        />
      </section>

      {/* UPLOAD WALLPAPER */}
      <section className="settings-section">
        <h3>Upload Wallpaper</h3>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        <button
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Image
        </button>
      </section>

      {/* ACCENT COLORS */}
      <section className="settings-section">
        <h3>Accent Color</h3>

        <div className="accent-row">
          {accentOptions[activeMode].map((color) => (
            <button
              key={color}
              className={
                currentAccent === color
                  ? "accent-dot active-accent"
                  : "accent-dot"
              }
              style={{ backgroundColor: color }}
              onClick={() =>
                updateModeTheme(activeMode, {
                  accent: color,
                })
              }
            />
          ))}
        </div>
      </section>

      {/* PREVIEW */}
      <section className="settings-preview">
        <h3>Preview</h3>

        <div
          className="preview-box"
          style={{
            backgroundImage: currentWallpaper,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderColor: currentAccent,
          }}
        >
          <button style={{ background: currentAccent }}>
            Sample Button
          </button>
        </div>
      </section>
    </div>
  );
}