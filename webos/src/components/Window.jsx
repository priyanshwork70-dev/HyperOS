import { useState } from "react";

export default function Window({
  title,
  children,
  onClose,
  onMinimize,
  offset = 0,
}) {
  const [position, setPosition] = useState({
    x: 120 + offset * 30,
    y: 90 + offset * 30,
  });

  const [dragging, setDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    setMouseOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const drag = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - mouseOffset.x,
      y: e.clientY - mouseOffset.y,
    });
  };

  const stopDrag = () => {
    setDragging(false);
  };

  return (
    <div
      className="window"
      style={{ left: position.x, top: position.y }}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="window-header" onMouseDown={startDrag}>
        <span>{title}</span>

        <div className="window-actions">
          <button className="min-btn" onClick={onMinimize}>
            —
          </button>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>

      <div className="window-body">{children}</div>
    </div>
  );
}