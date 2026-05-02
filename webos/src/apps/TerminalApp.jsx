import { useState } from "react";

export default function TerminalApp({ openApp, user }) {
  const [history, setHistory] = useState([
    "NexOS Terminal",
    "Type 'help' to see commands.",
  ]);

  const [command, setCommand] = useState("");

  const runCommand = () => {
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    let output = "";

    if (cmd === "help") {
      output =
        "Commands: help, clear, date, whoami, open notes, open calc, open todo, open music, open settings";
    } else if (cmd === "date") {
      output = new Date().toString();
    } else if (cmd === "whoami") {
      output = user;
    } else if (cmd === "open notes") {
      openApp("notes");
      output = "Opening Notes...";
    } else if (cmd === "open calc") {
      openApp("calc");
      output = "Opening Calculator...";
    } else if (cmd === "open todo") {
      openApp("todo");
      output = "Opening To-Do...";
    } else if (cmd === "open music") {
      openApp("music");
      output = "Opening Music Player...";
    } else if (cmd === "open settings") {
      openApp("settings");
      output = "Opening Settings...";
    } else {
      output = "Command not found";
    }

    setHistory([...history, `> ${command}`, output]);
    setCommand("");
  };

  return (
    <div className="terminal-app">
      <div className="terminal-history">
        {history.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") runCommand();
        }}
        placeholder="Type command..."
      />
    </div>
  );
}