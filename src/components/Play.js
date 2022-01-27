import React, { useEffect, useRef, useState } from "react";
import { games } from "../configs/default";
import GameFrame from "./GameFrame";
import Loading from "./Loading";

import jeffMonke from "../resources/jeff-monke.gif";
import samMonke from "../resources/sam-monke.gif";
import monke from "../resources/monke-nomonkey.png";
import styled from "styled-components";

const MonkeImg = styled.img`
  min-width: 1rem;
  min-height: 1rem;
`;

function Play() {
  const [loaded, setLoaded] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <MonkeImg src={jeffMonke} alt="Jeff" height="100rem"></MonkeImg>
        <MonkeImg src={monke} alt="monke" height="200rem"></MonkeImg>
        <MonkeImg src={samMonke} alt="Sam" height="100rem"></MonkeImg>
      </div>
    </div>
  );
}

export default Play;
