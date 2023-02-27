"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var LinkedList;
(function (LinkedList) {
    class Node {
        constructor(value, next) {
            this.value = value;
            this.next = next;
        }
    }
    LinkedList.Node = Node;
    function logging() {
        return function (target, propertyKey, descriptor) {
            let originalMethod = descriptor.value;
            descriptor.value = function (...args) {
                console.log("logging...");
                originalMethod.apply(this, args);
                // if(this !== undefined) console.log(this.value);
            };
        };
    }
    class SinglyLinkedList {
        constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        pop() {
            if (this.length === 0) {
                return null;
            }
            else if (this.length === 1) {
                const targetNode = this.head;
                this.head = null;
                this.tail = null;
                this.length--;
                return targetNode;
            }
            else if (this.length >= 2) {
                let beforeTail = this.head;
                while (true) {
                    if (beforeTail.next === this.tail)
                        break;
                    beforeTail = beforeTail.next;
                }
                const targetNode = this.tail;
                this.tail = beforeTail;
                this.tail.next = null;
                this.length--;
                return targetNode;
            }
        }
        unshift(value) {
            if (this.length === 0) {
                this.push(value);
            }
            else {
                const newNode = new Node(value, this.head);
                this.head = newNode;
            }
            this.length++;
        }
        shift() {
            if (this.length === 0) {
                return null;
            }
            //   else if (this.length === 1) {
            //     const targetNode = this.head;
            //     this.head = null;
            //     this.tail = null;
            //     return targetNode;
            //   }
            else {
                const targetNode = this.head;
                this.head = this.head.next;
                targetNode.next = null;
                this.length--;
                return targetNode;
            }
        }
        get(locNum) {
            if (this.length === 0)
                return null;
            const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum);
            if (!beforeNodeLocNum) {
                return null;
            }
            else {
                return beforeNodeLocNum.next;
            }
        }
        /**
         * this is set
         */
        set(value, locNum) {
            if (this.length === 0 || this.length <= locNum)
                return false;
            //length is more than 1
            if (locNum === 0)
                this.head.value = value;
            else {
                const targetNode = this.getNodeBeforeLocationNumber(locNum).next;
                targetNode.value = value;
            }
            return true;
        }
        insert(value, locNum) {
            const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum);
            if (!beforeNodeLocNum) {
                this.push(value);
            }
            else {
                const newNode = new Node(value, beforeNodeLocNum.next);
                beforeNodeLocNum.next = newNode;
            }
            this.length++;
        }
        remove(locNum) {
            // No elements
            let targetNode = null;
            if (this.length === 0)
                return targetNode;
            // Only one element
            if (this.head !== null && this.head === this.tail) {
                targetNode = this.head;
                this.head = null;
                this.tail = null;
            }
            if (this.length >= locNum) {
                const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum);
                targetNode = beforeNodeLocNum.next;
                beforeNodeLocNum.next = targetNode.next;
                targetNode.next = null;
            }
            this.length--;
            return targetNode;
        }
        push(value) {
            const node = new Node(value, null);
            if (this.length === 0) {
                this.head = node;
                this.tail = node;
            }
            else if (this.length !== 0) {
                this.tail.next = node;
                this.tail = node;
            }
            this.length++;
        }
        reverse() {
            let currentNode = this.head;
            while (currentNode !== this.tail) {
                let nextNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next;
                if (nextNode)
                    nextNode.next = currentNode;
                else
                    break;
                currentNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next;
            }
            const temp = this.head;
            this.head = this.tail;
            this.tail = temp;
            this.tail.next = null;
            return this.head;
        }
        //수정 필요
        getNodeBeforeLocationNumber(locNum) {
            if (this.length <= locNum)
                return null;
            else {
                let count = 0;
                let beforeNodeLocNum = this.head;
                while (count < locNum - 1) {
                    beforeNodeLocNum = beforeNodeLocNum.next;
                    count++;
                }
                return beforeNodeLocNum;
            }
        }
    }
    __decorate([
        logging(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SinglyLinkedList.prototype, "push", null);
    LinkedList.SinglyLinkedList = SinglyLinkedList;
})(LinkedList = exports.LinkedList || (exports.LinkedList = {}));
const singlyLinkedList = new LinkedList.SinglyLinkedList();
singlyLinkedList.push(3);
singlyLinkedList.push(5);
singlyLinkedList.push(7);
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.length);
console.log(singlyLinkedList.pop());
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.length);
singlyLinkedList.unshift(100);
console.log(singlyLinkedList.head);
console.log(`singlyLinkedList.get(1) : ${singlyLinkedList.get(1)}`);
console.log(singlyLinkedList.get(1));
console.log(`singlyLinkedList.get(2) : ${singlyLinkedList.get(2)}`);
console.log(singlyLinkedList.get(2));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.set(200, 2));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.remove(0));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.remove(10));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.set(300, 0));
console.log(singlyLinkedList.set(1000, 1));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.remove(0));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.remove(0));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.remove(0));
console.log(singlyLinkedList.head);
console.log(singlyLinkedList.reverse());
console.log(singlyLinkedList.head);
// console.log(singlyLinkedList.remove(0));
