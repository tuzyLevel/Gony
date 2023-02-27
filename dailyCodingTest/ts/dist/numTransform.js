"use strict";
var NumberTransform;
(function (NumberTransform) {
    class Node {
        constructor(value, count) {
            this.count = count;
            this.value = value;
            this.next = null;
        }
    }
    class Queue {
        constructor() {
            this.head = null;
            this.tail = this.head;
            this.length = 0;
        }
        enqueue(node) {
            if (this.length === 0) {
                //no node
                this.head = node;
                this.tail = this.head;
                this.length++;
                return;
            }
            //more than or equals 1 node
            this.tail.next = node;
            this.tail = node;
            this.length++;
        }
        dequeue() {
            if (this.length <= 0) {
                return null;
            }
            const target = this.head;
            if (this.length === 1) {
                this.head = null;
                this.tail = this.head;
                this.length--;
                return target;
            }
            this.head = this.head?.next;
            target.next = null;
            this.length--;
            return target;
        }
    }
    const addN = (target, addition) => {
        return target + addition;
    };
    const times2 = (target) => {
        return target * 2;
    };
    const times3 = (target) => {
        return target * 3;
    };
    function solution(x, y, n) {
        const q = new Queue();
        let answer = -1;
        // q.enqueue(new Node(x, 0));
        // while (q.length > 0) {
        //   const node = q.dequeue();
        //   if (node!.value === y && node!.count < answer) {
        //     answer = node!.count;
        //     continue;
        //   }
        //   const nAdded = addN(node!.value, n);
        //   const doubled = times2(node!.value);
        //   const trippled = times3(node!.value);
        //   const newCount = node!.count + 1;
        //   if (nAdded <= y) q.enqueue(new Node(nAdded, newCount));
        //   if (doubled <= y) q.enqueue(new Node(doubled, newCount));
        //   if (trippled <= y) q.enqueue(new Node(trippled, newCount));
        // }
        q.enqueue(new Node(y, 0));
        while (q.length > 0) {
            const node = q.dequeue();
            if (node.value === x) {
                answer = node.count;
                break;
            }
            const nSubtract = node.value - n;
            const div2 = node.value / 2;
            const div3 = node.value / 3;
            const newCount = node.count + 1;
            if (nSubtract >= x) {
                q.enqueue(new Node(nSubtract, newCount));
            }
            if (Number.isInteger(div2) && div2 >= x) {
                q.enqueue(new Node(div2, newCount));
            }
            if (Number.isInteger(div3) && div3 >= x) {
                q.enqueue(new Node(div3, newCount));
            }
        }
        return answer;
    }
    NumberTransform.solution = solution;
})(NumberTransform || (NumberTransform = {}));
console.log(NumberTransform.solution(10, 40, 5));
console.log(NumberTransform.solution(10, 40, 30));
console.log(NumberTransform.solution(2, 5, 4));
