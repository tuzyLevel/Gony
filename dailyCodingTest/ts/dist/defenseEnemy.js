"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = __importDefault(require("./collections"));
var DefenseEnemy;
(function (DefenseEnemy) {
    const q = new collections_1.default.Queue();
    function solution(n, k, enemy) {
        if (enemy.length <= k)
            return enemy.length;
        let answer = 0;
        q.enqueue(new collections_1.default.Node({ value: enemy[0], round: 0, powerCount: 0 }));
        q.enqueue(new collections_1.default.Node({ value: 0, round: 0, powerCount: 1 }));
        while (q.length > 0) {
            const node = q.dequeue();
            const { value, round, powerCount } = node.value;
            if (powerCount === k && value + enemy[round + 1] > n) {
                answer = round + 1;
                continue;
            }
            if (powerCount < k) {
                q.enqueue(new collections_1.default.Node({
                    value: value,
                    round: round + 1,
                    powerCount: powerCount + 1,
                }));
            }
            if (value + enemy[round + 1] <= n) {
                q.enqueue(new collections_1.default.Node({
                    value: value + enemy[round + 1],
                    round: round + 1,
                    powerCount: powerCount,
                }));
            }
        }
        return answer;
    }
    DefenseEnemy.solution = solution;
})(DefenseEnemy || (DefenseEnemy = {}));
console.log(DefenseEnemy.solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
console.log(DefenseEnemy.solution(2, 4, [3, 3, 3, 3]));
