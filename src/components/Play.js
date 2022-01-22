import React, { useEffect, useRef, useState } from "react";
import { games } from "../configs/default";
import GameFrame from "./GameFrame";
import Loading from "./Loading";

function Play() {
  const devilsTreaty = useRef(null);
  const polarPuttPutt = useRef(null);

  const [loaded, setLoaded] = useState([]);
  const [loading, setLoading] = useState(true);

  const addLoaded = (evt) => {
    let newLoaded = loaded;
    newLoaded.push(evt.target.title);
    console.log(newLoaded);
    setLoaded(newLoaded);
  };

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
      {games.map((game, index) => {
        return (
          <GameFrame
            key={index}
            src={game.src}
            title={game.title}
            href={game.href}
            onLoaded={(evt) => {
              let newLoaded = loaded;
              newLoaded.push(evt.target.title);
              setLoaded(newLoaded);
              if (newLoaded.length >= games.length) setLoading(false);
            }}
          ></GameFrame>
        );
      })}
    </div>
  );
}

export default Play;
