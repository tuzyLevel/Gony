"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collections;
(function (Collections) {
    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }
    Collections.Node = Node;
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
    Collections.Queue = Queue;
})(Collections || (Collections = {}));
exports.default = Collections;
