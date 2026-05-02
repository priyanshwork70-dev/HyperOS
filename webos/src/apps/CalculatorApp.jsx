import { useState } from "react";

export default function CalculatorApp() {
  const [input, setInput] = useState("");

  const press = (value) => {
    if (value === "C") {
      setInput("");
      return;
    }

    if (value === "⌫") {
      setInput(input.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        const result = Function(`"use strict"; return (${input})`)();
        setInput(String(result));
      } catch {
        setInput("Error");
      }
      return;
    }

    if (input === "Error") {
      setInput(value);
      return;
    }

    setInput(input + value);
  };

  const buttons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "(",
    ")",
    "=",
  ];

  return (
    <div className="calculator-app">
      <input value={input} readOnly placeholder="0" />

      <div className="calculator-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={btn === "=" ? "equal-btn" : ""}
            onClick={() => press(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}