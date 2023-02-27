"use strict";
var EditTable;
(function (EditTable) {
    class Node {
        constructor(no, value) {
            this.no = no;
            this.before = null;
            this.next = null;
            this.value = value;
        }
    }
    class Table {
        constructor() {
            this.head = null;
            this.tail = null;
            this.cursor = this.head;
            this.length = 0;
            this.deletedData = [];
            this.dataNo = 0;
        }
        do(command) {
            if (command === "C") {
                this.delete();
                return;
            }
            if (command === "Z") {
                this.cancelDelete();
                return;
            }
            if (command.length > 1) {
                const tempCmd = command.split(" ");
                const direction = tempCmd[0];
                const offset = +tempCmd[1];
                this.moveCursor(direction, offset);
                return;
            }
        }
        moveCursor(direction, offset) {
            if (direction === "U") {
                for (let i = 0; i < offset; i++) {
                    if (this.cursor.before === null)
                        break;
                    this.cursor = this.cursor.before;
                }
            }
            else if (direction === "D") {
                for (let i = 0; i < offset; i++) {
                    if (this.cursor.next === null)
                        break;
                    this.cursor = this.cursor.next;
                }
            }
        }
        delete() {
            const target = this.cursor;
            //delete 1st data
            if (target.before === null) {
                this.cursor = target.next;
                this.head = target.next;
                this.head.before = null;
            }
            else if (target.next === null) {
                //delete last data
                this.cursor = target.before;
                this.tail = target.before;
                this.tail.next = null;
            }
            else {
                this.cursor = this.cursor.next;
                target.before.next = target.next;
                target.next.before = target.before;
            }
            this.length--;
            this.deletedData.push(target);
        }
        cancelDelete() {
            const targetData = this.deletedData.pop();
            if (targetData.before === null) {
                //revive 1st data
                targetData.next = this.head;
                this.head = targetData;
            }
            else if (targetData.next === null) {
                //revive last data
                this.tail.next = targetData;
                this.tail = targetData;
            }
            else {
                targetData.before.next = targetData;
                targetData.next.before = targetData;
            }
            this.length++;
        }
        enterData(value) {
            const newNode = new Node(this.dataNo, value);
            this.dataNo++;
            if (this.length === 0) {
                this.head = newNode;
                this.tail = this.head;
                this.cursor = this.head;
            }
            if (this.length > 0) {
                newNode.before = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.length++;
        }
        traversal(totalAmount) {
            let current = this.head;
            let result = [];
            for (let i = 0; i < totalAmount; i++) {
                if (current.no === i) {
                    result.push("O");
                    if (current.next === null)
                        break;
                    current = current.next;
                }
                else {
                    result.push("X");
                }
            }
            return result.join("");
        }
    }
    EditTable.solution = (n, k, cmd) => {
        const table = new Table();
        for (let data = 0; data < n; data++) {
            table.enterData(data);
        }
        table.do("D 2");
        for (const s of cmd) {
            table.do(s);
        }
        return table.traversal(n);
    };
})(EditTable || (EditTable = {}));
// console.log(
//   EditTable.solution(8, 2, [
//     "D 2",
//     "C",
//     "U 3",
//     "C",
//     "D 4",
//     "C",
//     "U 2",
//     "Z",
//     "Z",
//   ])
// );
var EditTable2;
(function (EditTable2) {
    const data = [];
    function solution(n, k, cmd) {
        let cursor = k;
        const result = [];
        const deletedData = [];
        for (let i = 0; i < n; i++) {
            data.push({ no: i, deleted: false, before: i - 1, next: i + 1 });
        }
        data[n - 1].next = -1;
        for (const c of cmd) {
            if (c === "C") {
                const targetData = data[cursor];
                targetData.deleted = true;
                if (targetData.before === -1) {
                    //1st data
                    data[targetData.next].before = targetData.before;
                    cursor = targetData.next;
                }
                else if (targetData.next === -1) {
                    data[targetData.before].next = targetData.next;
                    cursor = targetData.before;
                }
                else {
                    data[targetData.before].next = targetData.next;
                    data[targetData.next].before = targetData.before;
                    cursor = targetData.next;
                }
                deletedData.push(targetData.no);
            }
            if (c === "Z") {
                const targetNum = deletedData.pop();
                data[targetNum].deleted = false;
                const beforeDataIdx = data[targetNum].before;
                const nextDataIdx = data[targetNum].next;
                if (beforeDataIdx === -1) {
                    data[nextDataIdx].before = targetNum;
                }
                else if (nextDataIdx === -1) {
                    data[beforeDataIdx].next = targetNum;
                }
                else {
                    data[beforeDataIdx].next = targetNum;
                    data[nextDataIdx].before = targetNum;
                }
            }
            if (c.length > 1) {
                //move Cursor
                const splitedCmd = c.split(" ");
                //커맨드의 첫부분이 U이면 before를 따라 이동 D이면 next를 따라 이동
                const direction = splitedCmd[0] === "U" ? "before" : "next";
                const offset = +splitedCmd[1];
                for (let i = 0; i < offset; i++) {
                    if (data[cursor][direction] === -1)
                        break;
                    cursor = data[cursor][direction];
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].deleted)
                result.push("X");
            else
                result.push("O");
        }
        return result.join("");
    }
    EditTable2.solution = solution;
})(EditTable2 || (EditTable2 = {}));
console.log(EditTable2.solution(8, 2, [
    "D 2",
    "C",
    "U 3",
    "C",
    "D 4",
    "C",
    "U 2",
    "Z",
    "Z",
]));
