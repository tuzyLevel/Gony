export namespace LinkedList {
  export class Node {
    value;
    next;
    constructor(value: any, next: Node | null) {
      this.value = value;
      this.next = next;
    }
  }

  function logging() {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      let originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        console.log("logging...");
        originalMethod.apply(this, args);
        // if(this !== undefined) console.log(this.value);
      };
    };
  }

  export class SinglyLinkedList {
    head: Node | null;
    tail: Node | null;
    length;

    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    pop() {
      if (this.length === 0) {
        return null;
      } else if (this.length === 1) {
        const targetNode = this.head;
        this.head = null;
        this.tail = null;
        this.length--;
        return targetNode;
      } else if (this.length >= 2) {
        let beforeTail: Node = this.head!;

        while (true) {
          if (beforeTail.next === this.tail) break;
          beforeTail = beforeTail.next!;
        }
        const targetNode = this.tail;
        this.tail = beforeTail;
        this.tail.next = null;
        this.length--;
        return targetNode;
      }
    }

    unshift(value: any) {
      if (this.length === 0) {
        this.push(value);
      } else {
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
        const targetNode = this.head!;
        this.head = this.head!.next;
        targetNode.next = null;
        this.length--;
        return targetNode;
      }
    }

    get(locNum: number) {
      if (this.length === 0) return null;
      const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum);
      if (!beforeNodeLocNum) {
        return null;
      } else {
        return beforeNodeLocNum.next;
      }
    }
    /**
     * this is set
     */
    set(value: any, locNum: number) {
      if (this.length === 0 || this.length <= locNum) return false;
      //length is more than 1
      if (locNum === 0) this.head!.value = value;
      else {
        const targetNode = this.getNodeBeforeLocationNumber(locNum)!.next!;
        targetNode.value = value;
      }
      return true;
    }

    insert(value: any, locNum: number) {
      const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum);
      if (!beforeNodeLocNum) {
        this.push(value);
      } else {
        const newNode = new Node(value, beforeNodeLocNum!.next);
        beforeNodeLocNum!.next = newNode;
      }
      this.length++;
    }

    remove(locNum: number) {
      // No elements
      let targetNode: Node | null = null;
      if (this.length === 0) return targetNode;
      // Only one element

      if (this.head !== null && this.head === this.tail) {
        targetNode = this.head;
        this.head = null;
        this.tail = null;
      }
      if (this.length >= locNum) {
        const beforeNodeLocNum = this.getNodeBeforeLocationNumber(locNum)!;
        targetNode = beforeNodeLocNum.next!;
        beforeNodeLocNum.next = targetNode.next;
        targetNode.next = null;
      }
      this.length--;
      return targetNode;
    }

    @logging()
    push(value: any): void {
      const node = new Node(value, null);
      if (this.length === 0) {
        this.head = node;
        this.tail = node;
      } else if (this.length !== 0) {
        this.tail!.next = node;
        this.tail = node;
      }
      this.length++;
    }

    reverse() {
      let currentNode = this.head;

      while (currentNode !== this.tail) {
        let nextNode = currentNode?.next;
        if (nextNode) nextNode.next = currentNode;
        else break;
        currentNode = currentNode?.next!;
      }
      const temp = this.head;
      this.head = this.tail;
      this.tail = temp;
      this.tail!.next = null;

      return this.head;
    }

    //수정 필요
    private getNodeBeforeLocationNumber(locNum: number) {
      if (this.length <= locNum) return null;
      else {
        let count = 0;
        let beforeNodeLocNum = this.head;
        while (count < locNum - 1) {
          beforeNodeLocNum = beforeNodeLocNum!.next;
          count++;
        }
        return beforeNodeLocNum;
      }
    }
  }
}

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
