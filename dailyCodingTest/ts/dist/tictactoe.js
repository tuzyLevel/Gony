"use strict";
var TICTACTOE;
(function (TICTACTOE) {
    TICTACTOE.solution = (board) => {
        //check row
        const countObj = {};
        const winningCount = {};
        countObj["O"] = 0;
        countObj["X"] = 0;
        countObj["."] = 0;
        winningCount["O"] = 0;
        winningCount["X"] = 0;
        const offsets = [
            [
                [
                    [0, 1],
                    [0, 2],
                ],
                [
                    [1, 0],
                    [2, 0],
                ],
            ],
            [
                [
                    [0, -1],
                    [0, 1],
                ],
                [
                    [-1, 0],
                    [1, 0],
                ],
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
            [
                [
                    [-1, 0],
                    [-2, 0],
                ],
                [
                    [0, -1],
                    [0, -2],
                ],
            ],
        ];
        let rcOdd = [board[0][0], true];
        let rcEven = [board[0][1], true];
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                countObj[board[r][c]]++;
                if ((r + c) % 2 === 0)
                    rcEven[1] = rcEven[1] && rcEven[0] === board[r][c];
                else
                    rcOdd[1] = rcOdd[1] && rcOdd[0] === board[r][c];
                if (r === c && board[r][c] !== ".") {
                    for (const offset of offsets[r]) {
                        const [[rOffset1, cOffset1], [rOffset2, cOffset2]] = offset;
                        if (board[r][c] === board[r + rOffset1][c + cOffset1] &&
                            board[r][c] === board[r + rOffset2][c + cOffset2])
                            winningCount[board[r][c]]++;
                    }
                }
            }
        }
        if (winningCount["O"] === 1 &&
            winningCount["X"] === 0 &&
            countObj["O"] === countObj["X"] + 1)
            return 1;
        if (winningCount["X"] === 1 &&
            winningCount["O"] === 0 &&
            countObj["O"] === countObj["X"])
            return 1;
        if (winningCount["O"] === 0 &&
            winningCount["X"] === 0 &&
            (countObj["O"] === countObj["X"] || countObj["O"] === countObj["X"] + 1))
            return 1;
        // if (rcOdd[0] !== rcEven[0] && rcOdd[1] && rcEven[1] && ) return 1;
        return 0;
    };
})(TICTACTOE || (TICTACTOE = {}));
console.log(TICTACTOE.solution(["OOO", "XXX", "..X"]));
console.log(TICTACTOE.solution(["...", ".X.", "..."]));
