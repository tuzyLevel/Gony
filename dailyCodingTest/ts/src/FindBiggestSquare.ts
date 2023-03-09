namespace FindBiggestSquare {
  export const solution = (board: number[][]) => {
    let maxWidth = 0;
    const boardWidth = board[0].length;
    const boardHeight = board.length;
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        if (boardWidth - j < maxWidth || boardHeight - i < maxWidth) break;
        if (board[i][j] === 0) continue;
        let width = 1;

        while (true) {
          let xPos = i + width;
          let yPos = j + width;
          let stop = false;
          if (xPos >= boardHeight || yPos >= boardWidth) break;
          for (let k = j; k <= yPos; k++) {
            if (board[xPos][k] === 0) {
              maxWidth = Math.max(width, maxWidth);
              stop = true;
              break;
            }
          }
          for (let k = i; k < xPos; k++) {
            if (board[k][yPos] === 0) {
              maxWidth = Math.max(width, maxWidth);
              stop = true;
              break;
            }
          }
          if (stop) break;
          width++;
          maxWidth = Math.max(width, maxWidth);
        }
      }
    }
    return maxWidth ** 2;
  };
}

console.log(
  FindBiggestSquare.solution([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])
);
console.log(
  FindBiggestSquare.solution([
    [0, 0, 1, 1],
    [1, 1, 1, 1],
  ])
);
