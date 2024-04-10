import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Loading from "./Other/Loading";

import song1 from "../resources/lofi/0.mp3";
import song2 from "../resources/lofi/1.mp3";
import song3 from "../resources/lofi/2.mp3";
import song4 from "../resources/lofi/3.mp3";
import song5 from "../resources/lofi/4.mp3";
const songs = [song1, song2, song3, song4, song5];

function Penguins() {
  const penguins = useRef(null);

  const [audio, setAudio] = useState(null);
  const [songIndex, setSongIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [yt, setYt] = useState(null);

  useEffect(() => {
    return () => {
      if (audio) audio.pause();
    };
  }, [audio]);

  const startAudio = () => {
    if (!audio) {
      const audio = new Audio(songs[songIndex]);
      audio.play();
      setAudio(audio);
      setInterval(() => {
        audio.volume = yt.isMuted() ? 0 : yt.getVolume() / 100;
      }, 100);

      audio.onended = () => {
        const newSongIndex = (songIndex + 1) % songs.length;
        audio.src = songs[newSongIndex];
        audio.play();
        setSongIndex(newSongIndex);
      };

      return;
    }

    audio.play();
  };

  const stopAudio = () => {
    audio.pause();
  };

  return (
    <div
      ref={penguins}
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loading show={loading}></Loading>
      <YouTube
        videoId={"kZmXVU9c668"}
        title={"Penguins Time"}
        onReady={(event) => {
          const ytFrame = penguins.current?.children[1];
          ytFrame.style.height = "100%";
          ytFrame.style.width = "100%";
          setLoading(false);
          setYt(event.target);
        }}
        onPlay={startAudio}
        onPause={stopAudio}
        onEnd={stopAudio}
        opts={{ height: "100%", width: "100%", autoPlay: 1 }}
      ></YouTube>
      <p style={{ textAlign: "left", fontSize: 10 }}>
        All songs you hear on this page are created by{" "}
        <a href="https://soundcloud.com/barradeen">Barradeen</a>
      </p>
    </div>
  );
}

export default Penguins;
