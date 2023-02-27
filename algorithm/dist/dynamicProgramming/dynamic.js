"use strict";
const fibonacci = (num) => {
    const arr = [];
    arr.push(1);
    arr.push(1);
    if (num === 1 || num === 2)
        return arr[num - 1];
    for (let i = 2; i < num; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[num - 1];
};
console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(10));
console.log(fibonacci(50));
console.log(fibonacci(100));
console.log(fibonacci(1000));
