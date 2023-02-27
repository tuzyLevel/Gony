namespace Collections {
  export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T) {
      this.value = value;
      this.next = null;
    }
  }

  export class Queue<S, T extends Node<S>> {
    head: T | null;
    tail: T | null;
    length: number;
    constructor() {
      this.head = null;
      this.tail = this.head;
      this.length = 0;
    }

    enqueue(node: T) {
      if (this.length === 0) {
        //no node
        this.head = node;
        this.tail = this.head;
        this.length++;
        return;
      }

      //more than or equals 1 node
      this.tail!.next = node;
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

      this.head = this.head?.next! as T;
      target!.next = null;
      this.length--;
      return target;
    }
  }
}

export default Collections;
