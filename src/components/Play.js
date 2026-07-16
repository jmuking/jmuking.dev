import { Box } from "@mui/material";
import React, { useState } from "react";
import { games } from "../configs/default";
import GameFrame from "./Frame/GameFrame";
import Loading from "./Other/Loading";

import jeffMonke from "../resources/jeff-monke.gif";
import samMonke from "../resources/sam-monke.gif";
import monke from "../resources/monke-nomonkey.png";

function Play() {
  const [loaded, setLoaded] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Loading show={loading} />
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
          />
        );
      })}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 2,
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        <Box
          component="img"
          src={jeffMonke}
          alt="Jeff"
          sx={{
            display: "block",
            width: { xs: "30%", md: "22%" },
            minWidth: 72,
            maxWidth: 220,
            height: "auto",
            objectFit: "contain",
          }}
        />
        <Box
          component="img"
          src={monke}
          alt="monke"
          sx={{
            display: "block",
            width: { xs: "36%", md: "28%" },
            minWidth: 96,
            maxWidth: 320,
            height: "auto",
            objectFit: "contain",
          }}
        />
        <Box
          component="img"
          src={samMonke}
          alt="Sam"
          sx={{
            display: "block",
            width: { xs: "30%", md: "22%" },
            minWidth: 72,
            maxWidth: 220,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}

export default Play;
