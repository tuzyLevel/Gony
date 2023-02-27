"use strict";
const selection = (k, tangerine) => {
    const countObj = {};
    for (let i = 0; i < tangerine.length; i++) {
        countObj[tangerine[i]] = countObj[tangerine[i]]
            ? countObj[tangerine[i]] + 1
            : 1;
    }
    const arr = [];
    for (const index in countObj) {
        arr.push([Number(index), countObj[index]]);
    }
    arr.sort((x, y) => y[1] - x[1]);
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += arr[i][1];
        if (result >= k)
            return i + 1;
    }
    return -1;
};
const solution = (k, tangerine) => {
    return selection(k, tangerine);
};
solution(6, [1, 3, 2, 5, 4, 5, 2, 3]);
