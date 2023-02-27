"use strict";
var BaseStation;
(function (BaseStation) {
    class Node {
        constructor(coverage) {
            this.coverage = coverage;
            this.next = null;
        }
    }
    BaseStation.solution = (n, stations, w) => {
        // const covered = Array<boolean>(n + 1);
        // for (let i = 0; i <= covered.length; i++) covered[i] = false;
        let result = 0;
        // const head = new Node([1, n]);
        let left = 1;
        for (const station of stations) {
            if (left > n)
                break;
            if (station - w - 1 < left) {
                left = station + w + 1;
                continue;
            }
            console.log(`left : ${left} right : ${station - w - 1}`);
            result += Math.ceil((station - w - 1 - left + 1) / (2 * w + 1));
            left = station + w + 1;
        }
        // if (left >= n) return result;
        result += Math.ceil((n - left + 1) / (2 * w + 1));
        return result;
    };
})(BaseStation || (BaseStation = {}));
console.log(BaseStation.solution(11, [4, 11], 1));
console.log(BaseStation.solution(16, [9], 2));
