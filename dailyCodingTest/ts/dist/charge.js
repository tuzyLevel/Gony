"use strict";
var Charge;
(function (Charge) {
    const getChangeCount = (n, money) => {
        let totalCount = 0;
        const digitCounts = Array(money.length);
        for (let i = 0; i < digitCounts.length; i++)
            digitCounts[i] = 0;
        money = money.sort((a, b) => b - a);
        console.log(money);
    };
    function solution(n, money) {
        let answer = 0;
        return getChangeCount(n, money);
    }
    Charge.solution = solution;
})(Charge || (Charge = {}));
Charge.solution(5, [1, 2, 5]);
