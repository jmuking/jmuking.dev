import styled from "styled-components";
import SploderItem from "./sploder_items/SploderItem";
import React, { useEffect, useState } from "react";

// ITEM TYPES
// 0 = BASIC
// 1 = SPLODING
// 2 = WALL
// 3 = REDIRECTOR
// 4 = DECAYING

const SPLODER_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 0, 3, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 3, 0],
  [0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// DIRECTION ENUMERATIONS
const ORIGIN = 0;
const DOWN = 1;
const UP = 2;
const RIGHT = 3;
const LEFT = 4;
const DOWN_RIGHT = 5;
const DOWN_LEFT = 6;
const UP_RIGHT = 7;
const UP_LEFT = 8;

const oppositeDirection = (dir) => {
  switch (dir) {
    case DOWN:
      return UP;
    case UP:
      return DOWN;
    case RIGHT:
      return LEFT;
    case LEFT:
      return RIGHT;
    case DOWN_RIGHT:
      return UP_LEFT;
    case DOWN_LEFT:
      return UP_RIGHT;
    case UP_RIGHT:
      return DOWN_LEFT;
    case UP_LEFT:
      return DOWN_RIGHT;
    default:
      return dir;
  }
};

const SploderTable = styled.table`
  height: 100%;
`;

const SploderRow = styled.tr``;

function Sploder() {
  const [sploderBoard, setSploderBoard] = useState(SPLODER_MAP);
  const [splosionWave, setSplosionWave] = useState([]);
  const [gameClock, setGameClock] = useState(0);

  useEffect(() => {
    let x = gameClock;
    setInterval(() => {
      setGameClock(++x);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const splosionTypeCheck = (lastX, lastY, nsw) => {
    if (
      nsw.x >= 0 &&
      nsw.y >= 0 &&
      nsw.y <= sploderBoard.length - 1 &&
      nsw.x <= sploderBoard[nsw.y].length - 1
    ) {
      switch (sploderBoard[nsw.y][nsw.x]) {
        case 2:
          return null;
        case 3:
          nsw.dir = oppositeDirection(nsw.dir);
          nsw.x = lastX;
          nsw.y = lastY;
          nsw.redirected = true;
          break;
        default:
          break;
      }

      return nsw;
    }

    return null;
  };

  const nextSplosionWaves = (x, y, dir, origin = false) => {
    let nsws = [];

    switch (dir) {
      case DOWN:
        nsws.push(splosionTypeCheck(x, y, { x, y: y + 1, dir }));
        break;
      case UP:
        nsws.push(splosionTypeCheck(x, y, { x, y: y - 1, dir }));
        break;
      case RIGHT:
        nsws.push(splosionTypeCheck(x, y, { x: x + 1, y, dir }));
        break;
      case LEFT:
        nsws.push(splosionTypeCheck(x, y, { x: x - 1, y, dir }));
        break;
      case DOWN_RIGHT:
        nsws.push(splosionTypeCheck(x, y, { x: x + 1, y: y + 1, dir }));
        break;
      case DOWN_LEFT:
        nsws.push(splosionTypeCheck(x, y, { x: x - 1, y: y + 1, dir }));
        break;
      case UP_RIGHT:
        nsws.push(splosionTypeCheck(x, y, { x: x + 1, y: y - 1, dir }));
        break;
      case UP_LEFT:
        nsws.push(splosionTypeCheck(x, y, { x: x - 1, y: y - 1, dir }));
        break;
      default:
        break;
    }

    return nsws.filter((nsw) => nsw);
  };

  const directWave = (wave) => {
    const x = wave.x;
    const y = wave.y;
    const dir = wave.dir;
    let newSplosionWave = [];

    if (dir === ORIGIN) {
      for (let i = 1; i <= 8; i++) {
        newSplosionWave = [
          ...newSplosionWave,
          ...nextSplosionWaves(x, y, i, true),
        ];
      }
    } else {
      newSplosionWave = nextSplosionWaves(x, y, dir);
    }

    return newSplosionWave;
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

    for (const y in sploderBoard) {
      for (const x in sploderBoard[y]) {
        const sploderCell = sploderBoard[y][x];
        if (sploderCell === 1 || sploderCell === 4) newSploderBoard[y][x] = 0;
      }
    }

    for (const i in splosionWave) {
      const newWave = splosionWave[i];
      if (newWave.redirected || newSploderBoard[newWave.y][newWave.x] === 0) {
        newSploderBoard[newWave.y][newWave.x] = newWave.redirected ? 4 : 1;
      }
    }

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
        height: "50rem",
        width: "100%",
        alignSelf: "center",
        maxHeight: "calc(100vh - 20rem)",
        maxWidth: "calc(100vh - 20rem)",
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
                        if (sploderItem === 0) triggerExplosion(x, y);
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
