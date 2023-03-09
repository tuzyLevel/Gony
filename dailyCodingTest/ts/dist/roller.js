"use strict";
var Roller;
(function (Roller) {
    Roller.solution = (n, m, section) => {
        let done = 0;
        let count = 0;
        for (const num of section) {
            if (num > done) {
                done = num + m - 1;
                count++;
            }
            if (done > n)
                break;
        }
        return count;
    };
})(Roller || (Roller = {}));
console.log(Roller.solution(8, 4, [2, 3, 6]));
console.log(Roller.solution(5, 4, [1, 3]));
console.log(Roller.solution(4, 1, [1, 2, 3, 4]));
