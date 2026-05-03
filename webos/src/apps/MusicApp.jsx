import { useEffect, useRef, useState } from "react";

const playlist = [
  { title: "Shinchan", artist: "CrazyGuy", src: "/music/song1.mpeg" },
  { title: "Doreamon", artist: "CrazyGuy", src: "/music/song2.mpeg" },
];

export default function MusicApp() {
  const audioRef = useRef(null);

  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentSong = playlist[songIndex];

  /* PLAY / PAUSE */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  /* NEXT / PREV */
  const nextSong = () => {
    if (isShuffle) {
      const random = Math.floor(Math.random() * playlist.length);
      setSongIndex(random);
    } else {
      setSongIndex((prev) =>
        prev === playlist.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSong = () => {
    setSongIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
  };

  /* AUTO PLAY */
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [songIndex]);

  /* UPDATE PROGRESS */
  const updateProgress = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setProgress(current);
    setDuration(total || 0);
  };

  /* SEEK */
  const seek = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  /* LOOP */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLoop;
    }
  }, [isLoop]);

  /* VOLUME */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /* FORMAT TIME */
  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="music-player-app">
      <div className="music-cover">♪</div>

      <h3>{currentSong.title}</h3>
      <p>{currentSong.artist}</p>

      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={updateProgress}
        onEnded={() => !isLoop && nextSong()}
      />

      {/* PROGRESS */}
      <div className="progress-box">
        <span>{formatTime(progress)}</span>

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={seek}
        />

        <span>{formatTime(duration)}</span>
      </div>

      {/* CONTROLS */}
      <div className="music-controls">
        <button onClick={prevSong}>⏮</button>

        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={nextSong}>⏭</button>
      </div>

      {/* EXTRA CONTROLS */}
      <div className="extra-controls">
        <button
          className={isLoop ? "active" : ""}
          onClick={() => setIsLoop(!isLoop)}
        >
          🔁
        </button>

        <button
          className={isShuffle ? "active" : ""}
          onClick={() => setIsShuffle(!isShuffle)}
        >
          🔀
        </button>
      </div>

      {/* VOLUME */}
      <div className="volume-box">
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
}