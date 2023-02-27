"use strict";
var SkillCheckTest;
(function (SkillCheckTest) {
    SkillCheckTest.problem1 = (n) => {
        const arr = Array(100000);
        arr[0] = 0;
        arr[1] = 1;
        const fibonacci = (n) => {
            if (arr[n] !== undefined)
                return arr[n];
            arr[n] = fibonacci(n - 2) + fibonacci(n - 1);
            return arr[n];
        };
        const solution = (n) => {
            return fibonacci(n) % 1234567;
        };
        return solution(n);
    };
})(SkillCheckTest || (SkillCheckTest = {}));
console.log(SkillCheckTest.problem1(2));
console.log(SkillCheckTest.problem1(3));
console.log(SkillCheckTest.problem1(4));
