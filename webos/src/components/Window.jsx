import { useState } from "react";

export default function Window({ title, children, onClose, onMinimize, offset = 0 }) {
  const [windowBox, setWindowBox] = useState({
    x: 140 + offset * 32,
    y: 120 + offset * 32,
    width: 520,
    height: 360,
  });

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragGap, setDragGap] = useState({ x: 0, y: 0 });

  const startDrag = (event) => {
    if (event.target.tagName === "BUTTON") return;

    setDragging(true);
    setDragGap({
      x: event.clientX - windowBox.x,
      y: event.clientY - windowBox.y,
    });
  };

  const moveWindow = (event) => {
    if (dragging) {
      setWindowBox((prev) => ({
        ...prev,
        x: event.clientX - dragGap.x,
        y: event.clientY - dragGap.y,
      }));
    }

    if (resizing) {
      setWindowBox((prev) => ({
        ...prev,
        width: Math.max(360, event.clientX - prev.x),
        height: Math.max(260, event.clientY - prev.y),
      }));
    }
  };

  const stopActions = () => {
    setDragging(false);
    setResizing(false);
  };

  const snapLeft = () => {
    setWindowBox({
      x: 20,
      y: 80,
      width: window.innerWidth / 2 - 35,
      height: window.innerHeight - 160,
    });
  };

  const snapRight = () => {
    setWindowBox({
      x: window.innerWidth / 2 + 10,
      y: 80,
      width: window.innerWidth / 2 - 35,
      height: window.innerHeight - 160,
    });
  };

  const maximizeWindow = () => {
    setWindowBox({
      x: 20,
      y: 70,
      width: window.innerWidth - 40,
      height: window.innerHeight - 145,
    });
  };

  return (
    <section
      className="app-window"
      style={{
        left: windowBox.x,
        top: windowBox.y,
        width: windowBox.width,
        height: windowBox.height,
      }}
      onMouseMove={moveWindow}
      onMouseUp={stopActions}
      onMouseLeave={stopActions}
    >
      <div className="window-titlebar" onMouseDown={startDrag}>
        <span>{title}</span>

        <div className="window-controls">
          <button title="Left Split" onClick={snapLeft}>◧</button>
          <button title="Right Split" onClick={snapRight}>◨</button>
          <button title="Maximize" onClick={maximizeWindow}>□</button>
          <button className="window-minimize" onClick={onMinimize}>—</button>
          <button className="window-close" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="window-content">{children}</div>

      <div
        className="resize-handle"
        onMouseDown={() => setResizing(true)}
      />
    </section>
  );
}