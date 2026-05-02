import { useState } from "react";

const buttons = [
  "C", "⌫", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".", "%", "±",
];

export default function CalculatorApp() {
  const [value, setValue] = useState("");

  const cleanExpression = (text) => {
    return text.replaceAll("×", "*").replaceAll("÷", "/");
  };

  const isSymbol = (char) => ["+", "-", "×", "÷", "%"].includes(char);

  const calculate = () => {
    if (!value) return;

    try {
      const answer = Function(`"use strict"; return (${cleanExpression(value)})`)();
      setValue(String(Number(answer.toFixed(8))));
    } catch {
      setValue("Error");
    }
  };

  const pressButton = (btn) => {
    if (btn === "C") {
      setValue("");
      return;
    }

    if (btn === "⌫") {
      setValue(value === "Error" ? "" : value.slice(0, -1));
      return;
    }

    if (btn === "=") {
      calculate();
      return;
    }

    if (btn === "±") {
      if (!value || value === "Error") return;
      setValue(value.startsWith("-") ? value.slice(1) : "-" + value);
      return;
    }

    if (value === "Error") {
      setValue(btn);
      return;
    }

    const last = value.slice(-1);

    if (isSymbol(btn) && isSymbol(last)) {
      setValue(value.slice(0, -1) + btn);
      return;
    }

    setValue(value + btn);
  };

  return (
    <div className="simple-calculator">
      <div className="calculator-screen">
        <span>Hyper Calculator</span>
        <input value={value} readOnly placeholder="0" />
      </div>

      <div className="calculator-buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => pressButton(btn)}
            className={
              btn === "="
                ? "equal-key"
                : ["+", "-", "×", "÷", "%"].includes(btn)
                ? "operator-key"
                : ["C", "⌫"].includes(btn)
                ? "danger-key"
                : ""
            }
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}