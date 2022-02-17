import React, { useEffect, useState, useRef } from "react";
import { colors } from "../../configs/default";

function GameFrame({ title, onLoaded, src, href }) {
  const game = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (game.current) {
      game.current.addEventListener("load", (evt) => {
        onLoaded(evt);
        setLoaded(true);
      });
    }
  }, [game]);

  return (
    <iframe
      title={title}
      ref={game}
      frameBorder="0"
      style={{ marginBottom: "1rem" }}
      src={`${src}?bg_color=${colors.dark.replace(
        "#",
        ""
      )}&fg_color=${colors.light.replace(
        "#",
        ""
      )}&link_color=${colors.other1.replace(
        "#",
        ""
      )}&border_color=${colors.dark.replace("#", "")}`}
      width={loaded ? "100%" : "0"}
      height={loaded ? "167" : "0"}
    >
      <a href={href}>{title}</a>
    </iframe>
  );
}

export default GameFrame;
