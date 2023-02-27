namespace HeapCollection {
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

  export class Heap {
    arr: number[];

    constructor() {
      this.arr = [];
    }
    extractMax() {
      //Empty
      if (this.arr.length === 0) return null;

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
            } else break;
          } else {
            if (this.compareTwoIndexValue(rightChildIdx, curIdx)) {
              this.swap(rightChildIdx, curIdx);
              curIdx = rightChildIdx;
            } else break;
          }
        }

        //Exists One Children
        else if (leftChildIdx < this.arr.length) {
          if (this.compareTwoIndexValue(leftChildIdx, curIdx)) {
            if (this.compareTwoIndexValue(leftChildIdx, curIdx)) {
              this.swap(leftChildIdx, curIdx);
              curIdx = leftChildIdx;
            } else break;
          } else break;
        } else break;
      }

      return maxValue;
    }

    insert(value: number) {
      this.arr.push(value);
      let curIdx = this.arr.length - 1;
      while (curIdx > 0) {
        const parentIdx = this.getParentIndex(curIdx);
        if (!this.compareTwoIndexValue(parentIdx, curIdx)) {
          const parentValue = this.arr[parentIdx];
          this.arr[parentIdx] = this.arr[curIdx];
          this.arr[curIdx] = parentValue;
          curIdx = parentIdx;
        } else break;
      }
      return this.arr;
    }

    private swap(targetIdx: number, destIdx: number) {
      const temp = this.arr[targetIdx]; //root value
      this.arr[targetIdx] = this.arr[destIdx];
      this.arr[destIdx] = temp;
    }

    private getParentIndex(idx: number) {
      return idx % 2 === 1 ? Math.floor(idx / 2) : idx / 2 - 1;
    }

    //get true when leftIndexValue is bigger than rightIndexValue
    private compareTwoIndexValue(idx_1: number, idx_2: number) {
      if (this.arr[idx_1] > this.arr[idx_2]) return true;
      return false;
    }
  }
}

type some = number | string;

interface ranked {
  rank: number;
  name?: string;
}

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

const r_obj1: ranked = { rank: 1, name: "park" };

export default HeapCollection;
