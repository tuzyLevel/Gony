namespace HotelReservation {
  // class Node {
  //   interval;
  //   before: Node | null;
  //   next: Node | null;
  //   constructor(interval: [number, number]) {
  //     this.interval = interval;
  //     this.before = null;
  //     this.next = null;
  //   }
  // }

  // class Reservation {
  //   head: Node | null;
  //   record: number[];
  //   constructor() {
  //     this.head = null;
  //     this.record = [];
  //   }

  //   reserve(roomNo: number) {
  //     let target = this.head;
  //     if (target === null) this.head = new Node([roomNo, roomNo]);
  //     else {
  //       while (true) {
  //         //현재 구간에 포함된다
  //         if (target.interval[0] <= roomNo && roomNo <= target.interval[1]) {
  //           target.interval[1]++;
  //           if (target.next === null) break;
  //           if (target.next.interval[0] === target.interval[1]) {
  //             target.interval[1] = target.next.interval[1];
  //             let temp = target.next;
  //             target.next = target.next.next;
  //             if (target.next) target.next.before = null;
  //             temp.before = null;
  //             temp.next = null;
  //           }
  //           break;
  //         }

  //         //현재 구간에 포함이 안될 시(target.interval[0] 보다 작은 경우)
  //         if (roomNo < target.interval[0]) {
  //           if (roomNo < target.interval[0] - 1) {
  //             const newNode = new Node([roomNo, roomNo]);
  //             newNode.next = this.head;
  //             this.head!.before = newNode;
  //             this.head = newNode;
  //           }
  //         }
  //       }
  //     }
  //   }

  // }

  type Interval = [number, number];
  type Nodable = Node | null;
  class Node {
    interval: Interval;
    before: Nodable;
    next: Nodable;
    constructor(interval: Interval) {
      this.interval = interval;
      this.before = null;
      this.next = null;
    }
  }

  class Reservation {
    head: Nodable;
    constructor() {
      this.head = null;
    }

    addReserve(roomNo: number){
      if(this.head === null){
        
      }
    }

  }

  function solution(k: number, room_number: number[]) {
    const reservation = new Reservation();
  }
}
