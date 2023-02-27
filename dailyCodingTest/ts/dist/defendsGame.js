"use strict";
var Defends;
(function (Defends) {
    class Node {
    }
})(Defends || (Defends = {}));
const defends = (n, k, enemy) => {
    if (k >= enemy.length)
        return enemy.length;
    const bigKthEnemy = enemy.slice(0, k);
    for (let round = k; round < enemy.length; round++) {
        bigKthEnemy.push(enemy[round]);
    }
};
const _3 = (n, k, enemy) => { };
