namespace CountDown {
  class Node {
    next: Node | null;
    value;
    count;
    constructor(value: number, count: number[]) {
      this.count = count;
      this.value = value;
      this.next = null;
    }
  }

  class Queue {
    head: Node | null;
    tail: Node | null;
    length: number;
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    enqueue(node: Node) {
      if (this.length === 0) {
        this.head = node;
        this.tail = this.head;
      } else {
        this.tail!.next = node;
        this.tail = node;
      }
      this.length++;
    }

    dequeue() {
      const targetNode = this.head;
      if (this.length === 0) return targetNode;
      else if (this.length === 1) {
        this.head = null;
        this.tail = this.head;
      } else {
        this.head = this.head!.next;
        targetNode!.next = null;
      }
      this.length--;
      return targetNode;
    }
  }

  export function solution(target: number) {
    const q = new Queue();
    q.enqueue(new Node(target, [0, 0]));

    let minimumCount = Infinity;
    let bullSingleCount = -1;
    while (q.length > 0) {
      const work = q.dequeue() as Node;
      if (work.value === 0) {
        if (work.count[0] <= minimumCount && work.count[1] > bullSingleCount) {
          minimumCount = work.count[0];
          bullSingleCount = work.count[1];
        }
        continue;
      }
      if (work.value > 0 && work.count[0] >= minimumCount) continue;

      if (work.value >= 50) {
        q.enqueue(
          new Node(work.value - 50, [work.count[0] + 1, work.count[1] + 1])
        );
        for (let i = 20; i > 16; i--) {
          if (work.value - 3 * i >= 0) {
            q.enqueue(
              new Node(work.value - 3 * i, [work.count[0] + 1, work.count[1]])
            );
            break;
          }
        }
      } else if (work.value >= 1 && work.value <= 20) {
        //single
        q.enqueue(new Node(0, [work.count[0] + 1, work.count[1] + 1]));
      } else {
        if (work.value % 2 === 0 && +(work.value / 2) <= 20) {
          q.enqueue(
            new Node(work.value - Math.floor(work.value / 2) * 2, [
              work.count[0] + 1,
              work.count[1],
            ])
          );
        } else {
          q.enqueue(
            new Node(work.value - Math.floor(work.value / 3) * 3, [
              work.count[0] + 1,
              work.count[1],
            ])
          );
        }
      }
    }
    return [minimumCount, bullSingleCount];
  }
}

console.log(CountDown.solution(21));
console.log(CountDown.solution(58));
console.log(CountDown.solution(71));
console.log(CountDown.solution(131));
