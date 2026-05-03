import { useEffect, useRef, useState } from "react";

export default function TerminalApp({ openApp }) {
  const [history, setHistory] = useState([
    "HyperOS Terminal v1.0",
    "Type 'help' to see commands",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const main = args[0];

    switch (main) {
      case "help":
        return [
          "Available commands:",
          "help",
          "clear",
          "date",
          "whoami",
          "echo [text]",
          "open [app]",
          "apps",
        ];

      case "clear":
        setHistory([]);
        return [];

      case "date":
        return [new Date().toString()];

      case "whoami":
        return ["HyperOS User"];

      case "echo":
        return [args.slice(1).join(" ")];

      case "apps":
        return ["notes, calculator, files, music, clock, settings"];

      case "open":
        if (!args[1]) return ["Usage: open [app]"];

        if (openApp) {
          openApp(args[1]);
        }

        return [`Opening ${args[1]}...`];

      default:
        return [`Command not found: ${cmd}`];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const output = runCommand(input);

    setHistory((prev) => [...prev, `> ${input}`, ...output]);
    setInput("");
  };

  return (
    <div className="terminal-app">
      <div className="terminal-output">
        {history.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-row">
        <span>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}