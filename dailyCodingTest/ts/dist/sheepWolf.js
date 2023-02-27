"use strict";
var SheepWolf;
(function (SheepWolf) {
    class Tree {
        constructor(info, edges) {
            this.info = info;
            this.edges = edges;
            this.hashedEdges = {};
            for (let i = 0; i < info.length; i++) {
                this.hashedEdges[i] = [];
            }
            for (const [s, d] of edges) {
                this.hashedEdges[s].push(d);
            }
        }
        getChild(target) {
            return this.hashedEdges[target];
        }
    }
    class Work {
        constructor(size, visited) {
            this.visited = visited;
            this.next = null;
            this.sheep = 0;
            this.wolf = 0;
        }
        isSheepMoreThanWolf() {
            return this.sheep > this.wolf;
        }
        pickSheep() {
            this.sheep++;
        }
        pickWolf() {
            this.wolf++;
        }
        getSheep() {
            return this.sheep;
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
                this.tail = this.head;
            }
            else if (this.length >= 1) {
                this.tail.next = node;
                this.tail = node;
            }
            this.length++;
        }
        dequeue() {
            const target = this.head;
            if (this.length === 1) {
                this.head = null;
                this.tail = this.head;
                this.length--;
            }
            else if (this.length > 1) {
                this.head = this.head.next;
                target.next = null;
                this.length--;
            }
            return target;
        }
    }
    function solution(info, edges) {
        const tree = new Tree(info, edges);
        const queue = new Queue();
        const initialWork = new Work(info.length, []);
        initialWork.sheep = 1;
        initialWork.visited.push(0);
        queue.enqueue(initialWork);
        let result = 1;
        while (queue.length > 0) {
            const work = queue.dequeue();
            if (work.isSheepMoreThanWolf()) {
                if (work.visited.length === info.length) {
                    result = work.getSheep() > result ? work.getSheep() : result;
                    continue;
                }
                for (const visitedNode of work.visited) {
                    //   if (tree.getChild(visitedNode).length === 0)
                    //     result = work.getSheep() > result ? work.getSheep() : result;
                    for (const child of tree.getChild(visitedNode)) {
                        if (!work.visited.includes(child)) {
                            const updatedVisited = work.visited.slice();
                            const newWork = new Work(info.length, updatedVisited);
                            updatedVisited.push(child);
                            newWork.sheep = work.sheep;
                            newWork.wolf = work.wolf;
                            tree.info[child] === 0 ? newWork.pickSheep() : newWork.pickWolf();
                            queue.enqueue(newWork);
                        }
                    }
                }
            }
            else {
                result = work.getSheep() > result ? work.getSheep() : result;
            }
        }
        return result;
    }
    SheepWolf.solution = solution;
})(SheepWolf || (SheepWolf = {}));
console.log(SheepWolf.solution([0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1], [
    [0, 1],
    [1, 2],
    [1, 4],
    [0, 8],
    [8, 7],
    [9, 10],
    [9, 11],
    [4, 3],
    [6, 5],
    [4, 6],
    [8, 9],
]));
console.log(SheepWolf.solution([0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0], [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
    [3, 7],
    [4, 8],
    [6, 9],
    [9, 10],
]));
