"use strict";
var TwoByOneTile;
(function (TwoByOneTile) {
    const calNumberOfCases = (n) => {
        if (n === 1 || n === 2)
            return n;
        const memo = [];
        memo[1] = 1;
        memo[2] = 2;
        for (let i = 3; i <= n; i++) {
            if (memo[i - 2] + memo[i - 1] > 1000000007) {
                memo[i] = (memo[i - 2] + memo[i - 1]) % 1000000007;
                continue;
            }
            memo[i] = memo[i - 2] + memo[i - 1];
        }
        return memo[n];
    };
    TwoByOneTile.solution = (n) => {
        return calNumberOfCases(n);
    };
})(TwoByOneTile || (TwoByOneTile = {}));
console.log(TwoByOneTile.solution(4));
console.log(TwoByOneTile.solution(60000));
