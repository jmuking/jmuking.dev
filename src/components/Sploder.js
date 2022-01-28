import styled from "styled-components";
import SploderItem from "./sploder_items/SploderItem";
import React, { useEffect, useState } from "react";

// ITEM TYPES
// 0 = BASIC
// 1 = SPLODING
// 2 = WALL
// 3 = REDIRECTOR
// 4 = PERSPLODING (will become SPLODING next turn)
// 5 = GOAL
// 6 = SCORED!!!

const SPLODER_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 5, 2, 0, 2, 0],
  [0, 0, 3, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 5, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 3, 0],
  [0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const copyMap = () => {
  return JSON.parse(JSON.stringify(SPLODER_MAP));
};

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

// WIN STATES
const NOPLAY = 0;
const WIN = 1;
const LOSE = 2;

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

const TurnText = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const GoalText = styled.div`
  font-size: 14px;
`;

const WinText = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 20px;
`;

function Sploder() {
  const [sploderBoard, setSploderBoard] = useState(copyMap());
  const [splosionWave, setSplosionWave] = useState([]);
  const [gameClock, setGameClock] = useState(null);
  const [turn, setTurn] = useState(0);
  const [turnGoal, setTurnGoal] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [goalsMet, setGoalsMet] = useState([]);
  const [win, setWin] = useState(NOPLAY);

  useEffect(() => {
    let x = turn;

    if (gameClock) clearInterval(gameClock);
    setGameClock(
      setInterval(() => {
        if (playing) setTurn(++x);
      }, 1000)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

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

  const resetState = () => {
    setGoalsMet([]);
    setSplosionWave([]);
    setSploderBoard(copyMap());
    setPlaying(false);
    setTurn(0);
  };

  const didTheyWin = () => {
    for (const y in sploderBoard) {
      for (const x in sploderBoard[y]) {
        if (sploderBoard[y][x] === 5) {
          const goal = `${x},${y}`;
          if (!goalsMet.includes(goal)) {
            setWin(LOSE);
            return;
          }
        }
      }
    }

    setWin(WIN);
  };

  useEffect(() => {
    if (turn === turnGoal + 1) {
      didTheyWin();
      resetState();
    } else if (playing) {
      let newSplosionWave = [];
      for (const i in splosionWave) {
        const newWave = splosionWave[i];
        newSplosionWave = [...newSplosionWave, ...directWave(newWave)];
      }

      setSplosionWave(newSplosionWave);
      if (newSplosionWave.length === 0) {
        setPlaying(false);
        setTurn(0);
      }
    }
  }, [turn]);

  useEffect(() => {
    let newSploderBoard = [...sploderBoard];

    for (const y in sploderBoard) {
      for (const x in sploderBoard[y]) {
        const sploderCell = sploderBoard[y][x];
        if (sploderCell === 1 || sploderCell === 4) newSploderBoard[y][x] = 0;
      }
    }

    let newGoalsMet = [];
    for (const i in splosionWave) {
      const newWave = splosionWave[i];
      if (newWave.redirected || newSploderBoard[newWave.y][newWave.x] === 0) {
        newSploderBoard[newWave.y][newWave.x] = newWave.redirected ? 4 : 1;
      } else if (
        newSploderBoard[newWave.y][newWave.x] === 5 &&
        turn === turnGoal
      ) {
        const newGoalMet = `${newWave.x},${newWave.y}`;
        if (!newGoalsMet.includes(newGoalMet)) newGoalsMet.push(newGoalMet);
        newSploderBoard[newWave.y][newWave.x] = 6;
      }
    }

    setGoalsMet(newGoalsMet);
    setSploderBoard(newSploderBoard);
  }, [splosionWave]);

  const triggerSplosion = (x, y) => {
    setPlaying(true);
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
      <div style={{ marginBottom: "1rem" }}>
        <TurnText>TURN: {turn}</TurnText>
        <GoalText>
          Land your splosion on the green blocks on turn {turnGoal}. By clicking
          on a block, you can trigger a splosion.
        </GoalText>
        <WinText>
          {win ? (win === WIN ? "You win!" : "You lose! Try again!") : ""}
        </WinText>
      </div>
      <SploderTable>
        <tbody>
          {sploderBoard.map((sploderRow, y) => {
            return (
              <SploderRow key={y}>
                {sploderRow.map((sploderItem, x) => {
                  return (
                    <SploderItem
                      key={`${x},${y}(${sploderItem})`}
                      x={x}
                      y={y}
                      itemType={sploderItem}
                      onClick={() => {
                        if (sploderItem === 0 && !playing)
                          triggerSplosion(x, y);
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
