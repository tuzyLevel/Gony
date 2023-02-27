"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeapFactory;
(function (HeapFactory) {
    class CustomHeap {
        constructor(f) {
            this.arr = Array();
            this.compareFunction = f;
        }
        insert(target) {
            let curIdx = this.arr.length;
            this.arr[curIdx] = target;
            while (true) {
                if (curIdx === 0)
                    break;
                const parentIdx = Math.ceil(curIdx / 2) - 1;
                if (this.compareUsingIdx(curIdx, parentIdx)) {
                    this.swap(curIdx, parentIdx);
                    curIdx = parentIdx;
                }
                else
                    break;
            }
        }
        extractTop() {
            const arrLength = this.arr.length;
            // less or equal 0 empty arr
            if (arrLength <= 0)
                return null;
            // more than 1 elements exist in arr
            this.swap(0, arrLength - 1);
            const value = this.arr.pop();
            let curIdx = 0;
            while (true) {
                const leftChild = 2 * curIdx + 1;
                const rightChild = 2 * curIdx + 2;
                if (this.arr[leftChild] && this.arr[rightChild]) {
                    if (this.compareUsingIdx(leftChild, rightChild) &&
                        this.compareUsingIdx(leftChild, curIdx)) {
                        this.swap(leftChild, curIdx);
                        curIdx = leftChild;
                        continue;
                    }
                    if (this.compareUsingIdx(rightChild, leftChild) &&
                        this.compareUsingIdx(rightChild, curIdx)) {
                        this.swap(rightChild, curIdx);
                        curIdx = rightChild;
                        continue;
                    }
                    break;
                }
                else if (this.arr[leftChild]) {
                    if (this.compareUsingIdx(leftChild, curIdx)) {
                        this.swap(leftChild, curIdx);
                        curIdx = leftChild;
                        continue;
                    }
                    else
                        break;
                }
                else
                    break;
            }
            return value;
        }
        swap(targetIdx, destIdx) {
            const temp = this.arr[targetIdx];
            this.arr[targetIdx] = this.arr[destIdx];
            this.arr[destIdx] = temp;
        }
        compareUsingIdx(targetIdx, destIdx) {
            return this.compareFunction(this.arr[targetIdx].value, this.arr[destIdx].value);
        }
    }
    HeapFactory.CustomHeap = CustomHeap;
})(HeapFactory || (HeapFactory = {}));
exports.default = HeapFactory;
//최대 힙
// const maxHeap = new HeapFactory.CustomHeap((a, b) => a > b);
// maxHeap.insert({ value: 5 });
// maxHeap.insert({ value: 10 });
// maxHeap.insert({ value: 1 });
// maxHeap.insert({ value: 3 });
// maxHeap.insert({ value: 13 });
// maxHeap.insert({ value: 25 });
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
// maxHeap.extractTop();
// console.log(maxHeap.arr);
