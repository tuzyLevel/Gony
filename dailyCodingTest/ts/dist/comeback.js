"use strict";
var ComeBack;
(function (ComeBack) {
    class Node {
        constructor(value, level) {
            this.value = value;
            this.level = level;
            this.next = null;
        }
    }
    class Queue {
        constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        enqueue(node) {
            if (this.length === 0) {
                this.head = node;
                this.tail = node;
            }
            if (this.length >= 1) {
                this.tail.next = node;
                this.tail = node;
            }
            this.length++;
        }
        dequeue() {
            const target = this.head;
            if (this.length === 0)
                return null;
            if (this.length === 1) {
                this.head = null;
                this.tail = this.head;
            }
            if (this.length >= 2) {
                this.head = this.head.next;
            }
            target.next = null;
            this.length--;
            return target;
        }
    }
    class Graph {
        constructor() {
            this.adjacencyList = [];
        }
        addVertex(vertex) {
            if (!this.adjacencyList[vertex]) {
                this.adjacencyList[vertex] = [];
                return true;
            }
            return false;
        }
        addEdge(s, d) {
            if (this.adjacencyList[s] && this.adjacencyList[d]) {
                this.adjacencyList[s].push(d);
                this.adjacencyList[d].push(s);
                return true;
            }
            return false;
        }
        BFSTraversal(n, s) {
            const q = new Queue();
            const visited = Array(n + 1).fill(false);
            const minDistances = Array(n + 1).fill(-1);
            q.enqueue(new Node(s, 0));
            while (q.length > 0) {
                const { value, level } = q.dequeue();
                if (!visited[value]) {
                    visited[value] = true;
                    minDistances[value] = level;
                    for (const child of this.adjacencyList[value]) {
                        if (!visited[child])
                            q.enqueue(new Node(child, level + 1));
                    }
                }
            }
            // const q: [number, number][] = [];
            // const visited = Array<number>(n + 1);
            // q.push([s, 0]);
            // while (q.length > 0) {
            //   const [node, level] = q.shift() as [number, number];
            //   if (!visited[node]) {
            //     if (node === d) return level;
            //     for (const child of this.adjacencyList[node]) {
            //       q.push([child, level + 1]);
            //     }
            //   }
            // }
            return minDistances;
        }
    }
    ComeBack.solution = (n, roads, sources, destination) => {
        const g = new Graph();
        for (let i = 1; i <= n; i++) {
            g.addVertex(i);
        }
        for (const [s, d] of roads) {
            g.addEdge(s, d);
        }
        console.time();
        // const result = [];
        const distancesFromDest = g.BFSTraversal(n, destination);
        const result = [];
        for (const s of sources) {
            result.push(distancesFromDest[s]);
        }
        console.timeEnd();
        return result;
    };
})(ComeBack || (ComeBack = {}));
console.log(ComeBack.solution(5, [
    [1, 2],
    [1, 4],
    [2, 4],
    [2, 5],
    [4, 5],
], [1, 3, 5], 5));
console.log(ComeBack.solution(3, [
    [1, 2],
    [2, 3],
], [2, 3], 1));
