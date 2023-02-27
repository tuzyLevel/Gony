import React, { useState } from "react";
import { gameObject } from "../GameObject/GameObject";
import classes from "./GameBoard.module.css";

const DUMMY_BOARD: Array<number[]> = [];
const MAX_COLS = 9;
const MAX_ROWS = 13;
for (let i = 0; i < MAX_ROWS; i++) {
  const temp = [];
  for (let j = 0; j < MAX_COLS; j++) {
    temp.push(0);
  }
  DUMMY_BOARD.push(temp);
}

const GameBoard = () => {
  const [board, setBoard] = useState<Array<number[]>>(DUMMY_BOARD);

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      console.log("ArrowUp");
    } else if (event.key === "ArrowRight") {
      console.log("ArrowRight");
    } else if (event.key === "ArrowDown") {
      console.log("ArrowDown");
    } else if (event.key === "ArrowLeft") {
      console.log("ArrowLeft");
      console.log(new gameObject([0, 0], 1, 1));
    }
  };

  return (
    <div
      className={classes["board-container"]}
      onKeyDown={onKeyDownHandler}
      tabIndex={0}
    >
      <div className={classes.gameboard}>
        {board.map((row, rIndex) => (
          <ul className={classes["board-row"]} key={`r${rIndex}`}>
            {row.map((col, cIndex) => (
              <li
                className={classes["board-column"]}
                key={`c${cIndex}`}
              >{`${rIndex}${cIndex}`}</li>
            ))}
          </ul>
        ))}
      </div>
      <div className={classes.sideboard}>
        <div className={classes.score}>
          <h2>Score :</h2>
          <p>50</p>
        </div>
        <div className={classes["sideboard-next"]}>
          <h2>Next Block</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
