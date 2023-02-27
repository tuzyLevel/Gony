"use strict";
// function solution(numbers: number[]) {
//   return numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
// }
class pData {
    constructor(priority, next) {
        this.priority = priority;
        this.next = next;
    }
}
const solution = (priorities, location) => {
    let result = 0;
    const priorityObj = {};
    const cQueue = new pData(priorities[0], null);
    for (const priority of priorities) {
    }
    const targetNumber = priorities[location];
    return result;
};
console.log(solution([2, 1, 3, 2], 2));
