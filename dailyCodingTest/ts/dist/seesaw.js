"use strict";
var Seesaw;
(function (Seesaw) {
    Seesaw.solution = (weights) => {
        const weightCountObj = {};
        let result = 0;
        for (const weight of weights) {
            weightCountObj[weight]
                ? weightCountObj[weight]++
                : (weightCountObj[weight] = 1);
        }
        const weightCountArray = Object.entries(weightCountObj);
        for (let i = 0; i < weightCountArray.length; i++) {
            const [weight, people] = weightCountArray[i];
            const scales = [+weight * 2, +weight * 3, +weight * 4];
            result += (people * (people - 1)) / 2;
            for (let j = i + 1; j < weightCountArray.length; j++) {
                for (let k = 2; k <= 4; k++) {
                    if (scales.includes(+weightCountArray[j][0] * k)) {
                        result += people * weightCountArray[j][1];
                        break;
                    }
                }
            }
        }
        return result;
    };
})(Seesaw || (Seesaw = {}));
console.log(Seesaw.solution([180, 100, 360, 100, 270]));
