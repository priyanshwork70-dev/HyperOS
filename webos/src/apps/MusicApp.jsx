import { useRef, useState } from "react";

const playlist = [
  {
    title: "Solar Breeze",
    artist: "HyperOS Sound",
    src: "/music/song1.mp3",
  },
  {
    title: "Neon Night",
    artist: "HyperOS Sound",
    src: "/music/song2.mp3",
  },
];

export default function MusicApp() {
  const audioRef = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = playlist[songIndex];

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeSong = (direction) => {
    let nextIndex = songIndex;

    if (direction === "next") {
      nextIndex = songIndex === playlist.length - 1 ? 0 : songIndex + 1;
    }

    if (direction === "prev") {
      nextIndex = songIndex === 0 ? playlist.length - 1 : songIndex - 1;
    }

    setSongIndex(nextIndex);
    setIsPlaying(false);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
      }
    }, 0);
  };

  return (
    <div className="music-player-app">
      <div className="music-cover">
        <span>♪</span>
      </div>

      <div className="music-info">
        <h2>{currentSong.title}</h2>
        <p>{currentSong.artist}</p>
      </div>

      <audio ref={audioRef} src={currentSong.src} onEnded={() => changeSong("next")} />

      <div className="music-controls">
        <button onClick={() => changeSong("prev")}>⏮</button>
        <button className="play-button" onClick={toggleMusic}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={() => changeSong("next")}>⏭</button>
      </div>

      <div className="playlist-box">
        {playlist.map((song, index) => (
          <button
            key={song.title}
            className={songIndex === index ? "active-song" : ""}
            onClick={() => {
              setSongIndex(index);
              setIsPlaying(false);
            }}
          >
            <strong>{song.title}</strong>
            <span>{song.artist}</span>
          </button>
        ))}
      </div>
    </div>
  );
}