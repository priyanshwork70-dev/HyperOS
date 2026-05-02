export default function SettingsApp({ theme, setTheme }) {
  return (
    <div className="settings-app">
      <h3>Settings</h3>
      <p>Current theme: {theme}</p>

      <div className="theme-buttons">
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("blue")}>Blue</button>
      </div>
    </div>
  );
}