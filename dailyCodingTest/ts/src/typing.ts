namespace TypingProblem {
  export class Node {
    current: [number, number];
    length: number;
    weight: number;
    constructor(left: number, right: number, length: number, weight: number) {
      this.current = [left, right];
      this.length = length;
      this.weight = weight;
    }
  }

  export class PriorityQueue {
    q: Node[];

    constructor() {
      this.q = [];
    }
    enqueue(node: Node) {
      let currentIdx = this.q.length;
      this.q[this.q.length] = node;

      while (currentIdx > 0) {
        let parentIdx =
          currentIdx % 2 === 0 ? currentIdx / 2 - 1 : (currentIdx - 1) / 2;
        if (parentIdx < 0) break;
        console.log(parentIdx);
        currentIdx = parentIdx;
      }
    }
  }

  class Solution {
    // root;
    constructor() {}
  }
}

const pq = new TypingProblem.PriorityQueue();
pq.enqueue(new TypingProblem.Node(4, 6, 0, 0));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
pq.enqueue(new TypingProblem.Node(4, 6, 0, 1));
console.log(pq.q);
