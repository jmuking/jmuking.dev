import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Loading from "./Other/Loading";

import song1 from "../resources/lofi/0.mp3";
import song2 from "../resources/lofi/1.mp3";
import song3 from "../resources/lofi/2.mp3";
import song4 from "../resources/lofi/3.mp3";
import song5 from "../resources/lofi/4.mp3";
import { getClientEnv } from "../configs/env";
const songs = [song1, song2, song3, song4, song5];

function Penguins() {
  const penguins = useRef(null);
  const playerContainer = useRef(null);

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
    <Box
      ref={penguins}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <Loading show={loading} />
      <Box
        ref={playerContainer}
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          "& .penguins-player": {
            width: "100%",
            height: "100%",
            display: "flex",
          },
          "& .penguins-player-frame": {
            width: "100%",
            height: "100%",
            border: 0,
            display: "block",
          },
        }}
      >
        <YouTube
          className="penguins-player"
          iframeClassName="penguins-player-frame"
          videoId={getClientEnv("PENGUIN_LIVESTREAM_ID")}
          title={"Penguins Time"}
          onReady={(event) => {
            const ytFrame = playerContainer.current?.querySelector("iframe");
            if (ytFrame) {
              ytFrame.style.height = "100%";
              ytFrame.style.width = "100%";
            }
            setLoading(false);
            setYt(event.target);
          }}
          onPlay={startAudio}
          onPause={stopAudio}
          onEnd={stopAudio}
          opts={{ height: "100%", width: "100%", autoPlay: 1 }}
        />
      </Box>
      <Typography
        sx={{ textAlign: "left", fontSize: 10, width: "100%", mb: 0 }}
      >
        All songs you hear on this page are created by{" "}
        <a href="https://soundcloud.com/barradeen">Barradeen</a>
      </Typography>
    </Box>
  );
}

export default Penguins;
