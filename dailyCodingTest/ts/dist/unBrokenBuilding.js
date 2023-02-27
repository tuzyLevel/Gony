"use strict";
var UnBrokenBuilding;
(function (UnBrokenBuilding) {
    UnBrokenBuilding.solution = (board, skill) => {
        let result = 0;
        const obj = {};
        for (const [type, r1, c1, r2, c2, degree] of skill) {
            let value;
            if (type === 1)
                value = -degree;
            else
                value = degree;
            for (let r = r1; r <= r2; r++) {
                if (!obj[r])
                    obj[r] = {};
                for (let c = c1; c <= c2; c++) {
                    obj[r][c] ? (obj[r][c] += value) : (obj[r][c] = value);
                }
            }
        }
        for (const row of Object.keys(obj)) {
            const r = +row;
            for (const col of Object.keys(obj[r])) {
                const c = +col;
                if (board[r][c] + obj[r][c] <= 0)
                    result++;
            }
        }
        return board.length * board[0].length - result;
    };
})(UnBrokenBuilding || (UnBrokenBuilding = {}));
console.log(UnBrokenBuilding.solution([
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
], [
    [1, 0, 0, 3, 4, 4],
    [1, 2, 0, 2, 3, 2],
    [2, 1, 0, 3, 1, 2],
    [1, 0, 1, 3, 3, 1],
]));
console.log(UnBrokenBuilding.solution([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
], [
    [1, 1, 1, 2, 2, 4],
    [1, 0, 0, 1, 1, 2],
    [2, 2, 0, 2, 0, 100],
]));
