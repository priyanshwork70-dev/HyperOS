import { useState } from "react";

export default function Window({ title, children, onClose, onMinimize, offset = 0 }) {
  const [windowPosition, setWindowPosition] = useState({
    x: 140 + offset * 32,
    y: 120 + offset * 32,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartGap, setDragStartGap] = useState({ x: 0, y: 0 });

  const startMovingWindow = (event) => {
    setIsDragging(true);

    setDragStartGap({
      x: event.clientX - windowPosition.x,
      y: event.clientY - windowPosition.y,
    });
  };

  const moveWindow = (event) => {
    if (!isDragging) return;

    setWindowPosition({
      x: event.clientX - dragStartGap.x,
      y: event.clientY - dragStartGap.y,
    });
  };

  const stopMovingWindow = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="app-window"
      style={{
        left: windowPosition.x,
        top: windowPosition.y,
      }}
      onMouseMove={moveWindow}
      onMouseUp={stopMovingWindow}
      onMouseLeave={stopMovingWindow}
    >
      <div className="window-titlebar" onMouseDown={startMovingWindow}>
        <span>{title}</span>

        <div className="window-controls">
          <button className="window-minimize" onClick={onMinimize}>
            —
          </button>
          <button className="window-close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </section>
  );
}