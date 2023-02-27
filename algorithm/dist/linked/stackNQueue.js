"use strict";
var LinkedList;
(function (LinkedList) {
    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }
    class Stack {
        constructor() {
            this.top = null;
            this.bottom = null;
            this.length = 0;
        }
        push(value) {
            const newNode = new Node(value);
            if (this.length === 0) {
                this.top = newNode;
                this.bottom = this.top;
            }
            else {
                newNode.next = this.top;
                this.top = newNode;
            }
            this.length++;
        }
        pop() {
            if (this.length === 0)
                return null;
            else {
                const targetNode = this.top;
                this.top = this.top.next;
                targetNode.next = null;
                return targetNode.value;
            }
        }
    }
    LinkedList.Stack = Stack;
    class Queue {
        constructor() {
            this.rear = null;
            this.front = null;
            this.length = 0;
        }
        enqueue(value) {
            const newNode = new Node(value);
            if (this.length === 0) {
                this.front = newNode;
                this.rear = this.front;
            }
            else {
                this.rear.next = newNode;
                this.rear = newNode;
            }
            this.length++;
        }
        dequeue() {
            if (this.length === 0)
                return null;
            const targetNode = this.front;
            if (this.length === 1) {
                this.front = null;
                this.rear = null;
            }
            else {
                this.front = this.front.next;
            }
            this.length--;
            return targetNode;
        }
    }
    LinkedList.Queue = Queue;
})(LinkedList || (LinkedList = {}));
// const stack = new LinkedList.Stack();
// stack.push(1);
// stack.push(3);
// stack.push(5);
// stack.push(7);
// stack.push(9);
// console.log(stack.pop());
// console.log(stack.top);
// console.log(stack.bottom);
const q = new LinkedList.Queue();
q.enqueue(1);
q.enqueue(3);
q.enqueue(5);
q.enqueue(7);
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
