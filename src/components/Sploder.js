import styled from "styled-components";
import SploderItem from "./SploderItem";
import React, { useEffect, useState } from "react";
import { sploderMaps } from "../configs/default";

// ITEM TYPES
// 0 = BASIC
// 1 = SPLODING
// 2 = WALL
// 3 = REDIRECTOR
// 4 = PERSPLODING (will become SPLODING next turn)
// 5 = GOAL
// 6 = SCORED!!!;

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
const NOTHING = 0;
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

const InfoText = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const GoalText = styled.div`
  font-size: 12px;
  line-height: 1.6;
`;

function Sploder() {
  const buildMap = (round) => {
    return JSON.parse(JSON.stringify(sploderMaps[round]));
  };

  const [sploderBoard, setSploderBoard] = useState(buildMap(0));
  const [splosionWave, setSplosionWave] = useState([]);
  const [gameClock, setGameClock] = useState(null);
  const [round, setRound] = useState(0);
  const [turn, setTurn] = useState(0);
  const [turnGoal, setTurnGoal] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [goalsMet, setGoalsMet] = useState([]);
  const [win, setWin] = useState(NOTHING);

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
    }

    if (playing) {
      let newSplosionWave = [];
      for (const i in splosionWave) {
        const newWave = splosionWave[i];
        newSplosionWave = [...newSplosionWave, ...directWave(newWave)];
      }

      if (newSplosionWave.length === 0 || turn > 10) {
        // max turns = 10
        if (win === WIN) {
          let nextRound = round + 1;
          if (nextRound > sploderMaps.length - 1) nextRound = 0;
          setRound(nextRound);
        } else resetBoard();
      } else setSplosionWave(newSplosionWave);
    }
  }, [turn]);

  const resetBoard = () => {
    setWin(NOTHING);
    setSploderBoard(buildMap(round));
    setPlaying(false);
    setTurn(0);
  };

  useEffect(() => {
    resetBoard();
  }, [round]);

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
    setGoalsMet([]);
    setSploderBoard(buildMap(round));
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
        maxWidth: "calc(100vh - 20rem)",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <InfoText>Turn: {turn}</InfoText>
          <InfoText style={{ fontSize: "14px" }}>
            {win ? (win === WIN ? "You win!" : "You lose! Try again!") : ""}
          </InfoText>
          <InfoText>Round: {round}</InfoText>
        </div>
        <GoalText>
          Land your splosion on the green blocks on turn {turnGoal}. By clicking
          on a purple block, you can trigger a splosion. blue blocks will
          reflect your splosion.
        </GoalText>
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
