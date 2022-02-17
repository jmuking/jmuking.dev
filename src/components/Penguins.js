import { useRef, useState } from "react";
import YouTube from "react-youtube";
import Loading from "./Other/Loading";
import lofi from "../resources/lofi.mp3";

function Penguins() {
  const penguins = useRef(null);

  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [yt, setYt] = useState(null);

  const startAudio = () => {
    if (!audio) {
      const audio = new Audio(lofi);
      audio.loop = true;
      audio.play();
      setAudio(audio);
      setInterval(() => {
        audio.volume = yt.isMuted() ? 0 : yt.getVolume() / 100;
      }, 100);

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
        height: "100%",
      }}
    >
      <Loading show={loading}></Loading>
      <YouTube
        videoId={"JJqXeRFsLjE"}
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
        bedtime after a coffee by Barradeen | https://soundcloud.com/barradeen/
        Creative Commons Attribution-ShareAlike 3.0 Unported
        https://creativecommons.org/licenses/by-sa/3.0/deed.en_US Music promoted
        by https://www.chosic.com/free-music/all/
      </p>
    </div>
  );
}

export default Penguins;
