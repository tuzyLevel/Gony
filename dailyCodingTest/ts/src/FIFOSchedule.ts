// namespace Schedule {
//   class Node {
//     core;
//     time;
//     maxTime;
//     next: Node | null;
//     constructor(core: number, maxTime: number) {
//       this.core = core;
//       this.maxTime = maxTime;
//       this.time = 0;
//       this.next = null;
//     }

//     work() {
//       this.time++;
//     }
//   }

//   class Queue {
//     head: Node | null;
//     tail: Node | null;
//     length: number;

//     constructor() {
//       this.head = null;
//       this.tail = this.head;
//       this.length = 0;
//     }

//     enqueue(node: Node) {
//       if (this.length === 0) {
//         this.head = node;
//         this.tail = this.head;
//       }

//       if (this.length >= 1) {
//         this.tail!.next = node;
//         this.tail = node;
//       }
//       this.length++;
//     }

//     dequeue() {
//       const targetNode = this.head;
//       if (this.length === 0) return targetNode;
//       if (this.length === 1) {
//         this.head = null;
//         this.tail = this.head;
//         this.length--;
//         return targetNode;
//       }
//       if (this.length >= 2) {
//         this.head = this.head!.next;
//         this.length--;
//         return targetNode;
//       }
//     }
//   }

//   class Scheduler {
//     q;
//     touchedWorkingNo;
//     cores;
//     totalWork;
//     lastWorkTouchedNode: Node | null;

//     constructor(cores: number[], totalWork: number) {
//       this.q = new Queue();
//       this.touchedWorkingNo = 0;
//       this.cores = cores;
//       this.totalWork = totalWork;
//       this.lastWorkTouchedNode = null;
//     }

//     init() {
//       for (let i = 0; i < this.cores.length; i++) {
//         this.q.enqueue(new Node(i, this.cores[i]));
//         this.touchedWorkingNo++;
//       }
//     }

//     work() {
//       let count = 0;

//       while (true) {
//         count++;
//         const node = this.q.dequeue() as Node;
//         node.time++;

//         if (node.time === node.maxTime) {
//           node.time = 0;
//           this.touchedWorkingNo++;
//         }
//         if (this.touchedWorkingNo === this.totalWork) {
//           this.lastWorkTouchedNode = node;
//         }

//         this.q.enqueue(node);
//         //working 1 cycle done
//         if (count === this.q.length) break;
//       }
//       return this.touchedWorkingNo;
//     }

//     getLastWorkTouchedNode() {
//       return this.lastWorkTouchedNode;
//     }
//   }

//   export function solution(n: number, cores: number[]) {
//     if (n <= cores.length) return n;
//     const scheduler = new Scheduler(cores, n);
//     scheduler.init();

//     while (!scheduler.getLastWorkTouchedNode()) {
//       scheduler.work();
//     }

//     return scheduler.getLastWorkTouchedNode()!.core;
//   }
// }

// console.log(Schedule.solution(6, [1, 2, 3]));

//효율성 테스트 실패
namespace Schedule {
  export function solution_1(n: number, cores: number[]) {
    if (n <= cores.length) return n;
    let workCount = cores.length;
    const counter = new Array<number>(n).fill(0);

    let findLastWorkCore = false;
    while (!findLastWorkCore) {
      for (let i = 0; i < counter.length; i++) {
        counter[i]++;
        if (counter[i] === cores[i]) {
          counter[i] = 0;
          workCount++;
          if (workCount === n) return i + 1;
        }
      }
    }
  }

  export function solution_2(n: number, cores: number[]) {
    if (n <= cores.length) return n;
    const timeGroup: { [time: number]: number[] } = {};
    let beforeFinishedWork = 0;
    let finishedWork = 0;
    let count = 0;
    for (const [index, value] of cores.entries()) {
      if (timeGroup[value]) timeGroup[value].push(index);
      else timeGroup[value] = [index];
    }

    const timeKeys = Object.keys(timeGroup).map((val) => parseInt(val));
    timeKeys.sort((a, b) => a - b);

    while (true) {
      if (finishedWork >= n) break;
      count++;
      beforeFinishedWork = finishedWork;
      for (const time of timeKeys) {
        if (count % time === 0) {
          finishedWork += timeGroup[time].length;
        }
      }
    }

    let zeroCount = 0;
    for (let i = 0; i < cores.length; i++) {
      if (count % cores[i] === 0) {
        zeroCount++;
      }
      if (zeroCount === finishedWork - beforeFinishedWork) return i + 1;
    }
  }

  export function solution(n: number, cores: number[]) {
    if (n <= cores.length) return n;

    const timeGroup: { [time: number]: number[] } = {};
    let beforeFinishedWork = -1;
    let finishedWork = 0;
    let count = 0;

    for (const [index, value] of cores.entries()) {
      if (timeGroup[value]) timeGroup[value].push(index);
      else timeGroup[value] = [index];
    }

    const timeKeys = Object.keys(timeGroup).map((val) => parseInt(val));
    timeKeys.sort((a, b) => a - b);

    while (true) {
      if (finishedWork >= n) break;
      count++;
      beforeFinishedWork = finishedWork;
      for (const time of timeKeys) {
        if (time > count) break;
        if (count % time === 0) {
          finishedWork += timeGroup[time].length;
        }
      }
    }

    let zeroCount = 0;
    for (let i = 0; i < cores.length; i++) {
      if (count % cores[i] === 0) {
        zeroCount++;
      }
      if (zeroCount === finishedWork - beforeFinishedWork) return i + 1;
    }
  }
}

console.log(Schedule.solution(6, [1, 2, 3]));
