"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeapCollection;
(function (HeapCollection) {
    //   type Nodeable = Node | null;
    //   class Node {
    //     value;
    //     leftChild: Nodeable;
    //     rightChildIdx: Nodeable;
    //     constructor(value: any) {
    //       this.value = value;
    //       this.leftChild = null;
    //       this.rightChildIdx = null;
    //     }
    //   }
    class Heap {
        constructor() {
            this.arr = [];
        }
        extractMax() {
            //Empty
            if (this.arr.length === 0)
                return null;
            //Change root and tail
            this.swap(0, this.arr.length - 1);
            //Extract Max
            const maxValue = this.arr.pop();
            //root compare with child
            let curIdx = 0;
            while (true) {
                const leftChildIdx = 2 * curIdx + 1;
                const rightChildIdx = 2 * curIdx + 2;
                //Exists Two Children
                if (leftChildIdx < this.arr.length && rightChildIdx < this.arr.length) {
                    if (this.compareTwoIndexValue(leftChildIdx, rightChildIdx)) {
                        if (this.compareTwoIndexValue(leftChildIdx, curIdx)) {
                            this.swap(leftChildIdx, curIdx);
                            curIdx = leftChildIdx;
                        }
                        else
                            break;
                    }
                    else {
                        if (this.compareTwoIndexValue(rightChildIdx, curIdx)) {
                            this.swap(rightChildIdx, curIdx);
                            curIdx = rightChildIdx;
                        }
                        else
                            break;
                    }
                }
                //Exists One Children
                else if (leftChildIdx < this.arr.length) {
                    if (this.compareTwoIndexValue(leftChildIdx, curIdx)) {
                        if (this.compareTwoIndexValue(leftChildIdx, curIdx)) {
                            this.swap(leftChildIdx, curIdx);
                            curIdx = leftChildIdx;
                        }
                        else
                            break;
                    }
                    else
                        break;
                }
                else
                    break;
            }
            return maxValue;
        }
        insert(value) {
            this.arr.push(value);
            let curIdx = this.arr.length - 1;
            while (curIdx > 0) {
                const parentIdx = this.getParentIndex(curIdx);
                if (!this.compareTwoIndexValue(parentIdx, curIdx)) {
                    const parentValue = this.arr[parentIdx];
                    this.arr[parentIdx] = this.arr[curIdx];
                    this.arr[curIdx] = parentValue;
                    curIdx = parentIdx;
                }
                else
                    break;
            }
            return this.arr;
        }
        swap(targetIdx, destIdx) {
            const temp = this.arr[targetIdx]; //root value
            this.arr[targetIdx] = this.arr[destIdx];
            this.arr[destIdx] = temp;
        }
        getParentIndex(idx) {
            return idx % 2 === 1 ? Math.floor(idx / 2) : idx / 2 - 1;
        }
        //get true when leftIndexValue is bigger than rightIndexValue
        compareTwoIndexValue(idx_1, idx_2) {
            if (this.arr[idx_1] > this.arr[idx_2])
                return true;
            return false;
        }
    }
    HeapCollection.Heap = Heap;
})(HeapCollection || (HeapCollection = {}));
const heap = new HeapCollection.Heap();
console.log(heap.insert(5));
console.log(heap.insert(4));
console.log(heap.insert(7));
console.log(heap.insert(10));
console.log(heap.insert(13));
console.log(heap.insert(15));
console.log(heap.extractMax());
console.log(heap.arr);
console.log(heap.extractMax());
console.log(heap.arr);
const r_obj1 = { rank: 1, name: "park" };
exports.default = HeapCollection;
