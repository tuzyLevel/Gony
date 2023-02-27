"use strict";
var BehindBigNumber;
(function (BehindBigNumber) {
    function solution(numbers) {
        const result = Array(numbers.length);
        result[result.length - 1] = -1;
        for (let i = result.length - 2; i >= 0; i--) {
            if (numbers[i] < numbers[i + 1]) {
                result[i] = numbers[i + 1];
                continue;
            }
            let existsBigNumber = false;
            for (let j = i + 1; j < result.length; j++) {
                if (numbers[i] < result[j]) {
                    result[i] = result[j];
                    existsBigNumber = true;
                    break;
                }
            }
            if (!existsBigNumber)
                result[i] = -1;
        }
        return result;
    }
    BehindBigNumber.solution = solution;
})(BehindBigNumber || (BehindBigNumber = {}));
console.log(BehindBigNumber.solution([2, 3, 3, 5]));
console.log(BehindBigNumber.solution([9, 1, 5, 3, 6, 2]));
