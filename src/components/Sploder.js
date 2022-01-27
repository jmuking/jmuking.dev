import styled from "styled-components";
import SploderItem from "./sploder_items/SploderItem";
import React, { useEffect, useState } from "react";

const SPLODER_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ORIGIN = 0;
const DOWN = 1;
const UP = 2;
const RIGHT = 3;
const LEFT = 4;
const DOWN_RIGHT = 5;
const DOWN_LEFT = 6;
const UP_RIGHT = 7;
const UP_LEFT = 8;

const SploderTable = styled.table`
  height: 100%;
`;

const SploderRow = styled.tr``;

function Sploder() {
  const [sploderBoard, setSploderBoard] = useState(SPLODER_MAP);
  const [splosionWave, setSplosionWave] = useState([]);
  const [lastSplosionWave, setLastSplosionWave] = useState([]);
  const [gameClock, setGameClock] = useState(0);

  useEffect(() => {
    let x = gameClock;
    setInterval(() => {
      setGameClock(++x);
    }, 500);
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
      if (
        [ORIGIN, DOWN].includes(dir) &&
        y < sploderBoard.length - 1 &&
        sploderBoard[y + 1][x] === 0
      ) {
        newSplosionWave.push({ x, y: y + 1, dir: DOWN });
      }

      // MOVE UP
      if ([ORIGIN, UP].includes(dir) && y > 0 && sploderBoard[y - 1][x] === 0) {
        newSplosionWave.push({ x, y: y - 1, dir: UP });
      }

      // MOVE RIGHT
      if (
        [ORIGIN, RIGHT].includes(dir) &&
        x < sploderRow.length - 1 &&
        sploderBoard[y][x + 1] === 0
      ) {
        newSplosionWave.push({ x: x + 1, y, dir: RIGHT });
      }

      // MOVE LEFT
      if (
        [ORIGIN, LEFT].includes(dir) &&
        x > 0 &&
        sploderBoard[y][x - 1] === 0
      ) {
        newSplosionWave.push({ x: x - 1, y, dir: LEFT });
      }

      // MOVE DOWN-RIGHT
      if (
        [ORIGIN, DOWN_RIGHT].includes(dir) &&
        y < sploderBoard.length - 1 &&
        x < sploderRow.length - 1
      ) {
        if (sploderBoard[y + 1][x + 1] === 0)
          newSplosionWave.push({ x: x + 1, y: y + 1, dir: DOWN_RIGHT });

        if (sploderBoard[y + 1][x] === 0)
          newSplosionWave.push({ x, y: y + 1, dir: DOWN });

        if (sploderBoard[y][x + 1] === 0)
          newSplosionWave.push({ x: x + 1, y, dir: RIGHT });
      }

      // MOVE DOWN-LEFT
      if (
        [ORIGIN, DOWN_LEFT].includes(dir) &&
        y < sploderBoard.length - 1 &&
        x > 0
      ) {
        if (sploderBoard[y + 1][x - 1] === 0)
          newSplosionWave.push({ x: x - 1, y: y + 1, dir: DOWN_LEFT });

        if (sploderBoard[y + 1][x] === 0)
          newSplosionWave.push({ x, y: y + 1, dir: DOWN });

        if (sploderBoard[y][x - 1] === 0)
          newSplosionWave.push({ x: x - 1, y, dir: LEFT });
      }

      // MOVE UP-RIGHT
      if (
        [ORIGIN, UP_RIGHT].includes(dir) &&
        y > 0 &&
        x < sploderRow.length - 1
      ) {
        if (sploderBoard[y - 1][x + 1] === 0)
          newSplosionWave.push({ x: x + 1, y: y - 1, dir: UP_RIGHT });

        if (sploderBoard[y - 1][x] === 0)
          newSplosionWave.push({ x, y: y - 1, dir: UP });

        if (sploderBoard[y][x + 1] === 0)
          newSplosionWave.push({ x: x + 1, y, dir: RIGHT });
      }

      // MOVE UP-LEFT
      if ([ORIGIN, UP_LEFT].includes(dir) && y > 0 && x > 0) {
        if (sploderBoard[y - 1][x - 1] === 0)
          newSplosionWave.push({ x: x - 1, y: y - 1, dir: UP_LEFT });

        if (sploderBoard[y - 1][x] === 0)
          newSplosionWave.push({ x, y: y - 1, dir: UP });

        if (sploderBoard[y][x - 1] === 0)
          newSplosionWave.push({ x: x - 1, y, dir: LEFT });
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
      if (newSploderBoard[newWave.y][newWave.x] === 0)
        newSploderBoard[newWave.y][newWave.x] = 1;
    }

    if (lastSplosionWave) {
      for (const i in lastSplosionWave) {
        const removeWave = lastSplosionWave[i];
        if (newSploderBoard[removeWave.y][removeWave.x] === 1)
          newSploderBoard[removeWave.y][removeWave.x] = 0;
      }
    }

    setLastSplosionWave([...splosionWave]);
    setSploderBoard(newSploderBoard);
  }, [splosionWave]);

  const triggerExplosion = (x, y) => {
    setSplosionWave([{ x, y, dir: ORIGIN }]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        margin: "2rem",
      }}
    >
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
