"use strict";
const combination = (arr, num) => { };
const permutation = (arr, totalNum) => {
    const result = [];
    const helper = (arr, selected) => {
        if (selected.length === totalNum) {
            result.push(selected);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            const resultArr = selected.slice();
            const copyArr = arr.slice();
            resultArr.push(copyArr[i]);
            copyArr.splice(i, 1);
            helper(copyArr, resultArr);
        }
    };
    helper(arr, []);
    return result;
};
const permutation2 = (arr, totalNum, selected, result) => {
    if (selected.length === totalNum) {
        result.push(selected);
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const resultArr = selected.slice();
        const copyArr = arr.slice();
        resultArr.push(copyArr[i]);
        copyArr.splice(i, 1);
        permutation2(copyArr, totalNum, resultArr, result);
    }
    return result;
};
console.log(permutation2([1, 2, 3, 4, 5], 2, [], []));
// console.log([1, 2, 3, 4, 5].splice(1, 1));
