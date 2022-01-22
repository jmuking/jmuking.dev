import React, { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

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
      <Loading show={loading}></Loading>
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
