"use strict";
var ExtraWorkIndex;
(function (ExtraWorkIndex) {
    class Heap {
        constructor(compareFn) {
            this.arr = [];
            this.compare = compareFn;
        }
        insert(value) {
            const arr = this.arr;
            arr[arr.length] = value;
            let idx = arr.length - 1;
            while (true) {
                if (idx === 0)
                    break;
                const parentIdx = Math.floor((idx - 1) / 2);
                let temp;
                if (this.compare(arr[idx], arr[parentIdx])) {
                    temp = arr[parentIdx];
                    arr[parentIdx] = arr[idx];
                    arr[idx] = temp;
                    idx = parentIdx;
                }
                else
                    break;
            }
        }
        pop() {
            const arr = this.arr;
            if (arr.length === 0)
                return null;
            let temp = arr[0];
            arr[0] = arr[arr.length - 1];
            arr[arr.length - 1] = temp;
            const target = arr.pop();
            let idx = 0;
            let left;
            let right;
            while (true) {
                left = idx * 2 + 1;
                right = idx * 2 + 2;
                //leaf value
                if (left >= arr.length && right >= arr.length)
                    break;
                //final value
                if (right >= arr.length && this.compare(arr[left], arr[idx])) {
                    this.swap(left, idx);
                    break;
                }
                if (this.compare(arr[left], arr[right]) &&
                    this.compare(arr[left], arr[idx])) {
                    this.swap(left, idx);
                    idx = left;
                    continue;
                }
                if (this.compare(arr[right], arr[left]) &&
                    this.compare(arr[right], arr[idx])) {
                    this.swap(right, idx);
                    idx = right;
                    continue;
                }
                break;
            }
            return target;
        }
        swap(lIdx, rIdx) {
            const temp = this.arr[lIdx];
            this.arr[lIdx] = this.arr[rIdx];
            this.arr[rIdx] = temp;
        }
    }
    const getExtraWorkIndex = (n, works) => {
        const h = new Heap((curVal, parentVal) => {
            return curVal >= parentVal;
        });
        for (const work of works) {
            h.insert(work);
        }
        for (let i = n; i > 0; i--) {
            const value = h.pop();
            if (value === null)
                break;
            if (value !== 1)
                h.insert(value - 1);
            console.log(`${value} -> ${value - 1} ${h.arr}`);
        }
        let result = BigInt(0);
        for (let i = 0; i < h.arr.length; i++) {
            result += BigInt(h.arr[i] ** 2);
        }
        return result;
    };
    function solution(n, works) {
        return getExtraWorkIndex(n, works);
    }
    ExtraWorkIndex.solution = solution;
})(ExtraWorkIndex || (ExtraWorkIndex = {}));
// console.log(ExtraWorkIndex.solution(4, [4, 3, 3]));
// console.log(ExtraWorkIndex.solution(1, [2, 1, 2]));
// console.log(ExtraWorkIndex.solution(3, [1, 1]));
// console.log(ExtraWorkIndex.solution(9, [1, 1, 1]));
// console.log(ExtraWorkIndex.solution(999, [800, 100, 55, 45]));
console.log(ExtraWorkIndex.solution(99, [2, 15, 22, 55, 55]));
// console.log(ExtraWorkIndex.solution(3, [1, 2, 3, 4, 5]));
