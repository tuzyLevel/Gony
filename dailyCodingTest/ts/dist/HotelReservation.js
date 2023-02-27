"use strict";
var HotelReservation;
(function (HotelReservation) {
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
    class Node {
        constructor(interval) {
            this.interval = interval;
            this.before = null;
            this.next = null;
        }
    }
    class Reservation {
        constructor() {
            this.head = null;
        }
        addReserve(roomNo) {
            if (this.head === null) {
            }
        }
    }
    function solution(k, room_number) {
        const reservation = new Reservation();
    }
})(HotelReservation || (HotelReservation = {}));
