"use strict";
const isOdd = (val) => {
    return val % 2 !== 0;
};
const someRecursive = (arr, f) => {
    if (arr.length === 0)
        return false;
    return f(arr.pop()) || someRecursive(arr, f);
};
console.log(someRecursive([1, 2, 3, 4], isOdd));
console.log(someRecursive([4, 6, 8, 9], isOdd));
console.log(someRecursive([4, 6, 8], isOdd));
console.log(someRecursive([4, 6, 8], (val) => val > 10));
