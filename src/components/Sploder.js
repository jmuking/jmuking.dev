import styled from "styled-components";
import SploderItem from "./sploder_items/SploderItem";
import React, { useEffect, useState } from "react";

const SPLODER_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ORIGIN = "origin";
const DOWN = "down";
const UP = "up";
const RIGHT = "right";
const LEFT = "left";
const DOWN_RIGHT = "downright";
const DOWN_LEFT = "downleft";
const UP_RIGHT = "upright";
const UP_LEFT = "upleft";

const SploderTable = styled.table``;

const SploderRow = styled.tr``;

function Sploder() {
  const [sploderBoard, setSploderBoard] = useState(SPLODER_MAP);
  const [splosionWave, setSplosionWave] = useState([]);
  const [lastSplosionWave, setLastSplosionWave] = useState([]);
  const [gameClock, setGameClock] = useState(0);
  const [lastSplosionPosition, setLastSplosionPosition] = useState(null);

  useEffect(() => {
    let x = gameClock;
    setInterval(() => {
      setGameClock(++x);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const directWave = (wave) => {
    const x = wave.x;
    const y = wave.y;
    const dir = wave.dir;

    if (y < sploderBoard.length) {
      const sploderRow = sploderBoard[y];
      let newSplosionWave = [];

      // MOVE DOWN
      if ([ORIGIN, DOWN].includes(dir) && y < sploderBoard.length - 1) {
        newSplosionWave.push({ x, y: y + 1, dir: "down" });
      }

      // MOVE UP
      if ([ORIGIN, UP].includes(dir) && y > 0) {
        newSplosionWave.push({ x, y: y - 1, dir: "up" });
      }

      // MOVE RIGHT
      if ([ORIGIN, RIGHT].includes(dir) && x < sploderRow.length - 1) {
        newSplosionWave.push({ x: x + 1, y, dir: "right" });
      }

      // MOVE LEFT
      if ([ORIGIN, LEFT].includes(dir) && x > 0) {
        newSplosionWave.push({ x: x - 1, y, dir: "left" });
      }

      // MOVE DOWN-RIGHT
      if (
        [ORIGIN, DOWN_RIGHT].includes(dir) &&
        y < sploderBoard.length - 1 &&
        x < sploderRow.length - 1
      ) {
        newSplosionWave.push({ x: x + 1, y: y + 1, dir: "downright" });
      }

      // MOVE DOWN-LEFT
      if (
        [ORIGIN, DOWN_LEFT].includes(dir) &&
        y < sploderBoard.length - 1 &&
        x > 0
      ) {
        newSplosionWave.push({ x: x - 1, y: y + 1, dir: "downleft" });
      }

      // MOVE UP-RIGHT
      if (
        [ORIGIN, UP_RIGHT].includes(dir) &&
        y > 0 &&
        x < sploderRow.length - 1
      ) {
        newSplosionWave.push({ x: x + 1, y: y - 1, dir: "upright" });
      }

      // MOVE UP-LEFT
      if ([ORIGIN, UP_LEFT].includes(dir) && y > 0 && x > 0) {
        newSplosionWave.push({ x: x - 1, y: y - 1, dir: "upleft" });
      }

      return newSplosionWave;
    }

    return [];
  };

  useEffect(() => {
    let newSplosionWave = [];
    for (const i in splosionWave) {
      const newWave = splosionWave[i];
      newSplosionWave = [...newSplosionWave, ...directWave(newWave)];
    }

    setSplosionWave(newSplosionWave);
  }, [gameClock]);

  useEffect(() => {
    let newSploderBoard = [...sploderBoard];

    for (const i in splosionWave) {
      const newWave = splosionWave[i];
      newSploderBoard[newWave.y][newWave.x] = 1;
    }

    if (lastSplosionWave) {
      for (const i in lastSplosionWave) {
        const removeWave = lastSplosionWave[i];
        newSploderBoard[removeWave.y][removeWave.x] = 0;
      }
    }

    setLastSplosionWave([...splosionWave]);
    setSploderBoard(newSploderBoard);
  }, [splosionWave]);

  const triggerExplosion = (x, y) => {
    setSplosionWave([{ x, y, dir: "origin" }]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SploderTable>
        <tbody>
          {sploderBoard.map((sploderRow, y) => {
            return (
              <SploderRow key={y}>
                {sploderRow.map((sploderItem, x) => {
                  return (
                    <SploderItem
                      key={`${x}(${sploderItem})`}
                      x={x}
                      y={y}
                      itemType={sploderItem}
                      onClick={() => {
                        triggerExplosion(x, y);
                      }}
                    ></SploderItem>
                  );
                })}
              </SploderRow>
            );
          })}
        </tbody>
      </SploderTable>
    </div>
  );
}

export default Sploder;
