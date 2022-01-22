import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../resources/loading.gif";

function Play() {
  const itch = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itch.current) {
      itch.current.addEventListener("load", () => {
        setLoading(false);
      });
    }
  }, [itch]);

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={loadingGif}
        alt="loading"
        width="100px"
        height="100px"
        style={{ display: loading ? "" : "none" }}
      ></img>
      <iframe
        title="Play a game"
        ref={itch}
        frameBorder="0"
        src="https://itch.io/embed/1258297?bg_color=33332f&amp;fg_color=e6e1cf&amp;link_color=41658A&amp;border_color=33332f"
        width={loading ? "0" : "100%"}
        height="167"
      >
        <a href="https://monke-games.itch.io/the-devils-treaty">
          The Devil's Treaty by Monke Games
        </a>
      </iframe>
    </div>
  );
}

export default Play;
