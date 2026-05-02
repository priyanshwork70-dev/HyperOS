import { useState } from "react";

export default function Window({ title, children, onClose, onMinimize, offset = 0 }) {
  const defaultBox = {
    x: 140 + offset * 30,
    y: 100 + offset * 30,
    width: 520,
    height: 360,
  };

  const [windowBox, setWindowBox] = useState(defaultBox);
  const [isDragging, setIsDragging] = useState(false);
  const [dragGap, setDragGap] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  const startDrag = (e) => {
    if (isMaximized) return;

    setIsDragging(true);
    setDragGap({
      x: e.clientX - windowBox.x,
      y: e.clientY - windowBox.y,
    });
  };

  const moveWindow = (e) => {
    if (!isDragging || isMaximized) return;

    setWindowBox((prev) => ({
      ...prev,
      x: e.clientX - dragGap.x,
      y: e.clientY - dragGap.y,
    }));
  };

  const stopDrag = () => setIsDragging(false);

  const toggleMaximize = () => {
    if (isMaximized) {
      setWindowBox(defaultBox);
    } else {
      setWindowBox({
        x: 10,
        y: 60,
        width: window.innerWidth - 20,
        height: window.innerHeight - 120,
      });
    }
    setIsMaximized(!isMaximized);
  };

  const snapLeft = () => {
    setIsMaximized(false);
    setWindowBox({
      x: 10,
      y: 60,
      width: window.innerWidth / 2 - 15,
      height: window.innerHeight - 120,
    });
  };

  const snapRight = () => {
    setIsMaximized(false);
    setWindowBox({
      x: window.innerWidth / 2 + 5,
      y: 60,
      width: window.innerWidth / 2 - 15,
      height: window.innerHeight - 120,
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
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="window-titlebar" onMouseDown={startDrag}>
        <span>{title}</span>

        <div className="window-controls">
          <button onClick={snapLeft}>◧</button>
          <button onClick={snapRight}>◨</button>
          <button onClick={toggleMaximize}>□</button>
          <button className="window-minimize" onClick={onMinimize}>—</button>
          <button className="window-close" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </section>
  );
}