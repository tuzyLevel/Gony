"use strict";
var NumberBlock;
(function (NumberBlock) {
    const secondaryBiggestDivisor = (num) => {
        if (num === 1)
            return 0;
        let divisor = 1;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                divisor = i;
                if (num / i <= 10000000)
                    return num / i;
            }
        }
        return divisor;
    };
    function solution(begin, end) {
        const result = [];
        for (let i = begin; i <= end; i++) {
            result.push(secondaryBiggestDivisor(i));
        }
        return result;
    }
    NumberBlock.solution = solution;
})(NumberBlock || (NumberBlock = {}));
console.log(NumberBlock.solution(1, 10));
