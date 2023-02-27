import backgroundClasses from "./Background.module.css";
import classes from "./Board.module.css";

const DUMMY_BOARD = [];
for (let i = 0; i < 20; i++) {
  const row = [];
  for (let j = 0; j < 9; j++) {
    row.push(4);
  }
  DUMMY_BOARD.push(row);
}

const Board = () => {
  return (
    <div className={backgroundClasses.background}>
      <div className={classes.board}>
        {DUMMY_BOARD.map((row, rIndex) => (
          <ul key={`row${rIndex}`}>
            {row.map((value, cIndex) => (
              <li
                className={rIndex < 4 && classes.board_starting}
                key={`col${cIndex}`}
              ></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Board;
