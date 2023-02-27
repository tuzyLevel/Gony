namespace Fatigability {
  class Node {
    fatigability: number;
    visited: boolean[];
    visitCount: number;
    next: Node | null;
    constructor(fatigability: number, visited: boolean[], visitCount: number) {
      this.fatigability = fatigability;
      this.visited = visited;
      this.visitCount = visitCount;
      this.next = null;
    }
  }

  class Queue {
    head: Node | null;
    tail: Node | null;
    length: number;
    constructor() {
      this.head = null;
      this.tail = this.head;
      this.length = 0;
    }

    enqueue(node: Node) {
      if (this.length === 0) {
        this.head = node;
        this.tail = this.head;
        this.length++;
        return;
      }

      this.tail!.next = node;
      this.tail = node;
      this.length++;
    }

    dequeue() {
      if (this.length === 0) return null;

      const target = this.head;
      if (this.length === 1) {
        this.head = null;
        this.tail = this.head;
        target!.next = null;
        this.length--;

        return target;
      }

      this.head = this.head!.next;
      target!.next = null;
      this.length--;
      return target;
    }
  }

  export function solution(k: number, dungeons: [number, number][]) {
    const q = new Queue();
    let visitCount = 0;
    const visited = Array<boolean>(8);
    for (let i = 0; i < visited.length; i++) visited[i] = false;
    q.enqueue(new Node(k, visited, 0));

    while (q.length > 0) {
      const node = q.dequeue();
      visitCount =
        visitCount < node!.visitCount ? node!.visitCount : visitCount;
      for (let i = 0; i < dungeons.length; i++) {
        if (!node!.visited[i] && node!.fatigability >= dungeons[i][0]) {
          const newFati = node!.fatigability - dungeons[i][1];
          const newVisited = node!.visited.slice();
          newVisited[i] = true;
          const newVisitCount = node!.visitCount + 1;
          q.enqueue(new Node(newFati, newVisited, newVisitCount));
        }
      }
    }

    return visitCount;
  }
}

console.log(
  Fatigability.solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
);
