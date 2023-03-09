"use strict";
var Elevator;
(function (Elevator) {
    const maxIndex = (storey) => {
        let index = 1;
        while (true) {
            if (storey / 10 ** index > 1) {
                index++;
            }
            else
                return index - 1;
        }
    };
    Elevator.solution = (storey) => {
        let result = 0;
        for (let i = maxIndex(storey); i >= 0; i--) {
            const operand = 10 ** i;
            while (true) {
                if (storey - operand < 0)
                    break;
                storey -= operand;
                result += 1;
            }
            if (storey === 0)
                break;
        }
        return result;
    };
})(Elevator || (Elevator = {}));
console.log(Elevator.solution(16));
