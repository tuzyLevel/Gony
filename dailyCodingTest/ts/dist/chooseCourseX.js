"use strict";
var ChooseCourse;
(function (ChooseCourse) {
    class Node {
        constructor(intensity, current, visited) {
            this.visited = visited;
            this.intensity = intensity;
            this.current = current;
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
    class PriorityQueue {
        constructor() {
            this.arr = [];
        }
        enqueue(node) {
            let currentIdx = this.arr.length;
            this.arr.push(node);
            while (true) {
                if (currentIdx === 0)
                    break;
                const parentIdx = currentIdx % 2 === 1 ? (currentIdx - 1) / 2 : currentIdx / 2 - 1;
                if (this.arr[parentIdx].intensity > this.arr[currentIdx].intensity) {
                    this.swap(parentIdx, currentIdx);
                    currentIdx = parentIdx;
                }
                else
                    break;
            }
        }
        dequeue() {
            if (this.arr.length === 0)
                return null;
            this.swap(0, this.arr.length - 1);
            const target = this.arr.pop();
            let currentIdx = 0;
            while (true) {
                let leftChild = 2 * currentIdx + 1;
                let rightChild = 2 * currentIdx + 2;
                if (leftChild < this.arr.length && rightChild < this.arr.length) {
                    if (this.arr[leftChild].intensity < this.arr[rightChild].intensity &&
                        this.arr[currentIdx].intensity > this.arr[leftChild].intensity) {
                        this.swap(leftChild, currentIdx);
                        currentIdx = leftChild;
                    }
                    else if (this.arr[leftChild].intensity > this.arr[rightChild].intensity &&
                        this.arr[rightChild].intensity < this.arr[currentIdx].intensity) {
                        this.swap(rightChild, currentIdx);
                        currentIdx = rightChild;
                    }
                    else
                        break;
                }
                else if (leftChild < this.arr.length) {
                    if (this.arr[leftChild].intensity < this.arr[currentIdx].intensity) {
                        this.swap(leftChild, currentIdx);
                    }
                    break;
                }
                else
                    break;
            }
            return target;
        }
        swap(idx_1, idx_2) {
            const temp = this.arr[idx_1];
            this.arr[idx_1] = this.arr[idx_2];
            this.arr[idx_2] = temp;
        }
    }
    ChooseCourse.PriorityQueue = PriorityQueue;
    class Graph {
        constructor(n, paths, gates, summits) {
            this.size = n;
            this.adjacencyList = [];
            this.gates = gates;
            this.summits = summits;
            for (let i = 0; i <= n; i++) {
                this.adjacencyList[i] = [];
            }
            for (let [s, d, w] of paths) {
                this.addEdge(s, d, w);
            }
            this.isGate = new Array(false).fill(false);
            for (const gate of gates) {
                this.isGate[gate] = true;
            }
            this.isSummit = new Array(false).fill(false);
            for (const summit of summits) {
                this.isSummit[summit] = true;
            }
        }
        addEdge(start, dest, weight) {
            this.adjacencyList[start].push([dest, weight]);
            this.adjacencyList[dest].push([start, weight]);
        }
        findCourseRecursive(start, finish) {
            const visited = Array(this.size).fill(false);
            const helpFn = (current, intensity, visited) => {
                const visitedArray = visited.slice();
                let tempResult = [];
                if (!visitedArray[current])
                    visitedArray[current] = true;
                for (const [child, weight] of this.adjacencyList[current]) {
                    if (this.gates.includes(child))
                        continue;
                    if (this.summits.includes(child) && child !== finish)
                        continue;
                    if (!visitedArray[child]) {
                        tempResult = tempResult.concat(helpFn(child, Math.max(intensity, weight), visitedArray));
                    }
                    if (child === finish) {
                        tempResult.push([finish, Math.max(intensity, weight)]);
                    }
                }
                return tempResult;
            };
            return helpFn(start, 0, visited);
        }
        findCourseRepetition(start, finish) {
            const q = new Queue();
            const result = [];
            const visited = new Array(this.size);
            for (const gate of this.gates) {
                visited[gate] = true;
            }
            for (const summit of this.summits) {
                if (summit !== finish)
                    visited[summit] = true;
            }
            q.enqueue(new Node(0, start, visited));
            while (q.length > 0) {
                const node = q.dequeue();
                const visitedArray = node.visited.slice();
                visitedArray[node.current] = true;
                if (node.current === finish) {
                    result.push([finish, node.intensity]);
                }
                for (const [child, weight] of this.adjacencyList[node.current]) {
                    if (!visitedArray[child]) {
                        q.enqueue(new Node(Math.max(weight, node.intensity), child, visitedArray));
                    }
                }
            }
            return result;
        }
        findCourse(start) {
            const distances = {};
            const previous = {};
        }
        djikstra(start) {
            const intensity = new Array(this.size + 1).fill(Infinity);
            const pq = new PriorityQueue();
            intensity[start] = 0;
            pq.enqueue({ intensity: 0, current: start });
            while (pq.arr.length > 0) {
                const work = pq.dequeue();
                for (const [child, weight] of this.adjacencyList[work.current]) {
                    const candidate = Math.max(work.intensity, weight);
                    if (intensity[child] > candidate &&
                        !this.isGate[child] &&
                        !this.isSummit[child]) {
                        intensity[child] = candidate;
                        pq.enqueue({ intensity: candidate, current: child });
                    }
                }
            }
            return intensity;
        }
    }
    function solution(n, paths, gates, summits) {
        const g = new Graph(n, paths, gates, summits);
        let result = [Infinity, Infinity];
        for (const gate of gates) {
            const intensity = g.djikstra(gate);
            for (const summit of summits) {
                for (const [node, weight] of g.adjacencyList[summit]) {
                    if ((node === gate || !g.isGate[node]) && !g.isSummit[node])
                        intensity[summit] =
                            intensity[summit] > Math.max(intensity[node], weight)
                                ? Math.max(intensity[node], weight)
                                : intensity[summit];
                }
                if (intensity[summit] < result[1]) {
                    result[0] = summit;
                    result[1] = intensity[summit];
                }
            }
        }
        return result;
        // return result.sort((a, b) => a[1] - b[1])[0];
    }
    ChooseCourse.solution = solution;
})(ChooseCourse || (ChooseCourse = {}));
console.log(ChooseCourse.solution(6, [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
], [1, 3], [5]));
console.log(ChooseCourse.solution(7, [
    [1, 2, 5],
    [1, 4, 1],
    [2, 3, 1],
    [2, 6, 7],
    [4, 5, 1],
    [5, 6, 1],
    [6, 7, 1],
], [3, 7], [1, 5]));
