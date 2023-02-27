export namespace LinkedList {
  export type Nodeable = Node | null;

  class Node {
    value;
    left: Nodeable;
    right: Nodeable;
    constructor(value: any) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  export class DoubleLinkedList {
    head: Nodeable;
    tail: Nodeable;
    length: number;

    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    push(value: any) {
      if (this.length === 0) {
        this.head = new Node(value);
        this.tail = this.head;
      } else {
        const newNode = new Node(value);
        this.tail!.right = newNode;
        newNode.left = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }

    pop() {
      let targetNode: Nodeable = null;
      if (this.length === 0) return targetNode;
      else if (this.length === 1) {
        targetNode = this.tail;
        this.tail = null;
        this.head = this.tail;
      } else {
        targetNode = this.tail;
        this.tail = this.tail?.left as Nodeable;
        this.tail!.right = null;
        targetNode!.left = null;
      }
      this.length--;
      return targetNode;
    }

    shift() {
      let targetNode: Nodeable = null;

      if (this.length === 0) return targetNode;
      else if (this.length === 1) {
        targetNode = this.head;
        this.head = null;
        this.tail = this.head;
      } else {
        targetNode = this.head!;
        this.head = this.head?.right!;
        this.head.left = null;
        targetNode.right = null;
      }
      this.length--;
      return targetNode;
    }

    unshift(value: any) {
      const newNode = new Node(value);
      if (this.length === 0) {
        this.head = newNode;
        this.tail = this.head;
      } else {
        newNode.right = this.head;
        this.head!.left = newNode;
        this.head = newNode;
      }
      this.length++;
    }
    set(value: number, locNum: number) {
      const targetNode = this.get(locNum);
      if (targetNode === null) return null;
      targetNode.value = value;
      return targetNode;
    }

    get(locNum: number) {
      const closestDirection = this.getClosestDirection(locNum);
      const offset = this.getOffsetFromClosestDirection(locNum);
      if (closestDirection === null || offset === -1) return null;

      let targetNode: Nodeable = closestDirection;
      if (closestDirection === this.head) {
        for (let i = 1; i < offset; i++) {
          targetNode = targetNode!.right;
        }
      } else {
        for (let i = 1; i < offset; i++) {
          targetNode = targetNode!.left;
        }
      }
      return targetNode;
    }

    insert(value: any, locNum: number) {
      const targetNode = this.get(locNum);
      if (targetNode === null) {
        if (locNum <= 0) this.unshift(value);
        else if (locNum > this.length) this.push(value);
      } else {
        if (targetNode === this.head) this.unshift(value);
        else if (targetNode === this.tail) this.push(value);
        else {
          const newNode = new Node(value);
          const beforeNode = targetNode.left!;
          beforeNode.right = newNode;
          targetNode.left = newNode;
          newNode.right = targetNode;
          newNode.left = beforeNode;
        }
      }
      this.length++;
      return this.head;
    }

    remove(locNum: number) {
      const targetNode = this.get(locNum);

      if (targetNode === null) return false;
      else {
      }
      this.length--;
    }

    private getOffsetFromClosestDirection(locNum: number) {
      if (this.length < locNum || locNum <= 0) return -1;
      if (locNum >= Math.ceil(this.length / 2)) {
        return this.length - locNum;
      } else return locNum;
    }

    private getClosestDirection(locNum: number) {
      //start at 1
      if (this.length < locNum || locNum <= 0) {
        return null;
      }
      if (locNum >= Math.ceil(this.length / 2)) return this.tail;
      else return this.head;
    }
  }
}

const doubleLinkedList = new LinkedList.DoubleLinkedList();
doubleLinkedList.push(3);
doubleLinkedList.push(5);
doubleLinkedList.push(7);
doubleLinkedList.push(9);
// console.log(doubleLinkedList.head);
// console.log(doubleLinkedList.pop());
// console.log(doubleLinkedList.head);
// console.log(doubleLinkedList.pop());
// console.log(doubleLinkedList.head);
// console.log(doubleLinkedList.pop());
// console.log(doubleLinkedList.head);
console.log(doubleLinkedList.unshift(10));
console.log(doubleLinkedList.head);
console.log(`length: ${doubleLinkedList.length}`);

console.log(doubleLinkedList.get(2));
console.log(doubleLinkedList.set(1, 1));
console.log(doubleLinkedList.insert(6, 10));
console.log(doubleLinkedList.tail);
const doubleLinkedList_2 = new LinkedList.DoubleLinkedList();
