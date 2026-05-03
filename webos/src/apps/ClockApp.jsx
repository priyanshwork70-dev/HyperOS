import { useEffect, useState } from "react";

export default function ClockApp() {
  const [activeTab, setActiveTab] = useState("clock");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (!stopwatchRunning) return;

    const interval = setInterval(() => {
      setStopwatchTime((oldTime) => oldTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((oldTime) => {
        if (oldTime <= 1) {
          setTimerRunning(false);
          alert("Timer finished!");
          return 0;
        }

        return oldTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const formatSeconds = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }

    return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  const formattedClock = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="clock-app">
      <div className="clock-tabs">
        <button
          className={activeTab === "clock" ? "active-clock-tab" : ""}
          onClick={() => setActiveTab("clock")}
        >
          Clock
        </button>

        <button
          className={activeTab === "stopwatch" ? "active-clock-tab" : ""}
          onClick={() => setActiveTab("stopwatch")}
        >
          Stopwatch
        </button>

        <button
          className={activeTab === "timer" ? "active-clock-tab" : ""}
          onClick={() => setActiveTab("timer")}
        >
          Timer
        </button>
      </div>

      {activeTab === "clock" && (
        <section className="clock-panel">
          <div className="clock-face">
            <h1>{formattedClock}</h1>
            <p>{formattedDate}</p>
          </div>
        </section>
      )}

      {activeTab === "stopwatch" && (
        <section className="clock-panel">
          <div className="clock-face">
            <h1>{formatSeconds(stopwatchTime)}</h1>
            <p>Stopwatch</p>
          </div>

          <div className="clock-actions">
            <button onClick={() => setStopwatchRunning(!stopwatchRunning)}>
              {stopwatchRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={() => {
                setStopwatchRunning(false);
                setStopwatchTime(0);
              }}
            >
              Reset
            </button>
          </div>
        </section>
      )}

      {activeTab === "timer" && (
        <section className="clock-panel">
          <div className="clock-face">
            <h1>{formatSeconds(timerSeconds)}</h1>
            <p>Timer</p>
          </div>

          <div className="timer-inputs">
            <button onClick={() => setTimerSeconds(60)}>1 min</button>
            <button onClick={() => setTimerSeconds(300)}>5 min</button>
            <button onClick={() => setTimerSeconds(600)}>10 min</button>
          </div>

          <div className="clock-actions">
            <button onClick={() => setTimerRunning(!timerRunning)}>
              {timerRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(300);
              }}
            >
              Reset
            </button>
          </div>
        </section>
      )}
    </div>
  );
}