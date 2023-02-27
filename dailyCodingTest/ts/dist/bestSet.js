"use strict";
var BestSet;
(function (BestSet) {
    function solution(n, s) {
        const result = [];
        // n is count ov base value
        const baseValue = Math.floor(s / n);
        const residueCount = s % n;
        for (let i = 0; i < n - residueCount; i++)
            result.push(baseValue);
        for (let i = 0; i < residueCount; i++) {
            result.push(baseValue + 1);
        }
        return result[0] === 0 ? [-1] : result;
    }
    BestSet.solution = solution;
})(BestSet || (BestSet = {}));
console.log(BestSet.solution(2, 9));
console.log(BestSet.solution(2, 8));
console.log(BestSet.solution(2, 1));
