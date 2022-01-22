import React, { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

function Chill() {
  const spotify = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (spotify.current) {
      spotify.current.addEventListener("load", () => {
        setLoading(false);
      });
    }
  }, [spotify]);

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Loading show={loading}></Loading>
      <iframe
        ref={spotify}
        title="Chill out to tunes"
        style={{ flexGrow: 1, display: loading ? "none" : "" }}
        src="https://open.spotify.com/embed/playlist/0FtamvDjvYIDFPvxoYcrPa?utm_source=generator&theme=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
}

export default Chill;
