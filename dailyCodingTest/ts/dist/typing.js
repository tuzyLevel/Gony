"use strict";
var TypingProblem;
(function (TypingProblem) {
    class Node {
        constructor(left, right, length, weight) {
            this.current = [left, right];
            this.length = length;
            this.weight = weight;
        }
    }
    TypingProblem.Node = Node;
    class PriorityQueue {
        constructor() {
            this.q = [];
        }
        enqueue(node) {
            let currentIdx = this.q.length;
            this.q[this.q.length] = node;
            while (currentIdx > 0) {
                let parentIdx = currentIdx % 2 === 0 ? currentIdx / 2 - 1 : (currentIdx - 1) / 2;
                if (parentIdx < 0)
                    break;
                console.log(parentIdx);
                currentIdx = parentIdx;
            }
        }
    }
    TypingProblem.PriorityQueue = PriorityQueue;
    class Solution {
        // root;
        constructor() { }
    }
})(TypingProblem || (TypingProblem = {}));
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
