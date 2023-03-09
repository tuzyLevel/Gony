"use strict";
var CPSS;
(function (CPSS) {
    //   export const solution = (sequence: number[]) => {
    //     let maximum = 0;
    //     for (let i = 0; i < sequence.length; i++) {
    //       let pStartSum = sequence[i]; //start positive pulse
    //       let nStartSum = -sequence[i]; //start negative pulse
    //       if (pStartSum > maximum) maximum = pStartSum;
    //       if (nStartSum > maximum) maximum = nStartSum;
    //       for (let j = i + 1; j < sequence.length; j++) {
    //         if ((j - i) % 2 === 1) {
    //           pStartSum -= sequence[j];
    //           nStartSum += sequence[j];
    //         } else {
    //           pStartSum += sequence[j];
    //           nStartSum -= sequence[j];
    //         }
    //         if (pStartSum > maximum) {
    //           maximum = pStartSum;
    //         }
    //         if (nStartSum > maximum) {
    //           maximum = nStartSum;
    //         }
    //       }
    //     }
    //     return maximum;
    //   };
    CPSS.solution = (sequence) => {
        const resultArray = Array(sequence.length);
        const dpPos = [];
        const dpNeg = [];
        dpPos[0] = sequence[0];
        dpNeg[0] = -sequence[0];
        let result = Math.max(dpPos[0], dpNeg[0]);
        for (let i = 1; i < sequence.length; i++) {
            if (i % 2 === 1) {
                dpPos[i] = Math.max(dpPos[i - 1] - sequence[i], -sequence[i]);
                dpNeg[i] = Math.max(dpNeg[i - 1] + sequence[i], sequence[i]);
            }
            else {
                dpPos[i] = Math.max(dpPos[i - 1] + sequence[i], +sequence[i]);
                dpNeg[i] = Math.max(dpNeg[i - 1] - sequence[i], -sequence[i]);
            }
            result = Math.max(result, dpPos[i], dpNeg[i]);
        }
        return result;
    };
})(CPSS || (CPSS = {}));
console.log(CPSS.solution([2, 3, -6, 1, 3, -1, 2, 4]));
