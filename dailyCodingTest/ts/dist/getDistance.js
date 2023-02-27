"use strict";
var GetDistance;
(function (GetDistance) {
    const checkDistanceRule = (place) => {
        const offset = [
            [0, 2],
            [0, 1],
            [1, 1],
            [-1, 1],
            [1, 0],
            [2, 0],
            [-1, 0],
            [-2, 0],
        ];
        for (let rIdx = 0; rIdx < place.length; rIdx++) {
            for (let cIdx = 0; cIdx < place[rIdx].length; cIdx++) {
                if (place[rIdx][cIdx] === "P")
                    for (const [rOffset, cOffset] of offset) {
                        //방을 벗어난 경우에는 다음 오프셋으로 넘김
                        if (rIdx + rOffset >= place.length ||
                            cIdx + cOffset >= place[rIdx].length ||
                            rIdx + rOffset < 0 ||
                            cIdx + cOffset < 0)
                            continue;
                        if (place[rIdx + rOffset][cIdx + cOffset] !== "P")
                            continue;
                        if (((rOffset === -1 || rOffset === 1) && cOffset === 0) ||
                            (rOffset === 0 && cOffset === 1))
                            return false;
                        if (rOffset === 0 && cOffset === 2 && place[rIdx][cIdx + 1] !== "X")
                            return false;
                        if (((rOffset === 1 && cOffset === 1) ||
                            (rOffset === -1 && cOffset === 1)) &&
                            place[rIdx + rOffset][cIdx + cOffset] === "P" &&
                            !(place[rIdx + rOffset][cIdx] === "X" &&
                                place[rIdx][cIdx + cOffset] === "X"))
                            return false;
                        if (rOffset === -2 &&
                            cOffset === 0 &&
                            place[rIdx + rOffset][cIdx] === "P" &&
                            place[rIdx - 1][cIdx] !== "X")
                            return false;
                        if (rOffset === 2 &&
                            cOffset === 0 &&
                            place[rIdx + rOffset][cIdx] === "P" &&
                            place[rIdx + 1][cIdx] !== "X")
                            return false;
                    }
            }
        }
        return true;
    };
    function solution(places) {
        const result = [];
        for (const place of places) {
            result.push(checkDistanceRule(place) ? 1 : 0);
        }
        return result;
    }
    GetDistance.solution = solution;
})(GetDistance || (GetDistance = {}));
console.log(GetDistance.solution([
    ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
    ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
    ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
    ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
    ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
]));
