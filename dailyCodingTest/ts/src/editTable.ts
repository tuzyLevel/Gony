namespace EditTable {
  type Nodeable = Node | null;
  class Node {
    no: number;
    before: Nodeable;
    next: Nodeable;
    value: number;
    constructor(no: number, value: number) {
      this.no = no;
      this.before = null;
      this.next = null;
      this.value = value;
    }
  }

  class Table {
    head: Nodeable;
    tail: Nodeable;
    cursor: Nodeable;
    length: number;
    dataNo: number;
    deletedData: Nodeable[];
    constructor() {
      this.head = null;
      this.tail = null;
      this.cursor = this.head;
      this.length = 0;
      this.deletedData = [];
      this.dataNo = 0;
    }

    do(command: string) {
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

    moveCursor(direction: string, offset: number) {
      if (direction === "U") {
        for (let i = 0; i < offset; i++) {
          if (this.cursor!.before === null) break;
          this.cursor! = this.cursor!.before;
        }
      } else if (direction === "D") {
        for (let i = 0; i < offset; i++) {
          if (this.cursor!.next === null) break;
          this.cursor! = this.cursor!.next;
        }
      }
    }

    private delete() {
      const target = this.cursor as Node;
      //delete 1st data
      if (target.before === null) {
        this.cursor = target.next;
        this.head = target.next;
        this.head!.before = null;
      } else if (target.next === null) {
        //delete last data
        this.cursor = target.before;
        this.tail = target.before;
        this.tail.next = null;
      } else {
        this.cursor = this.cursor!.next;
        target.before!.next = target!.next;
        target.next.before = target.before;
      }
      this.length--;
      this.deletedData.push(target);
    }

    private cancelDelete() {
      const targetData = this.deletedData.pop() as Node;
      if (targetData.before === null) {
        //revive 1st data
        targetData.next = this.head;
        this.head = targetData;
      } else if (targetData.next === null) {
        //revive last data
        this.tail!.next = targetData;
        this.tail = targetData;
      } else {
        targetData.before.next = targetData;
        targetData.next.before = targetData;
      }
      this.length++;
    }

    enterData(value: number) {
      const newNode = new Node(this.dataNo, value);

      this.dataNo++;
      if (this.length === 0) {
        this.head = newNode;
        this.tail = this.head;
        this.cursor = this.head;
      }

      if (this.length > 0) {
        newNode.before = this.tail;
        this.tail!.next = newNode;
        this.tail = newNode;
      }
      this.length++;
    }

    traversal(totalAmount: number) {
      let current = this.head as Node;
      let result: string[] = [];
      for (let i = 0; i < totalAmount; i++) {
        if (current.no === i) {
          result.push("O");
          if (current.next === null) break;
          current = current.next;
        } else {
          result.push("X");
        }
      }
      return result.join("");
    }
  }

  export const solution = (n: number, k: number, cmd: string[]) => {
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
}

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

namespace EditTable2 {
  const data: { no: number; deleted: boolean; before: number; next: number }[] =
    [];

  export function solution(n: number, k: number, cmd: string[]) {
    let cursor = k;
    const result: string[] = [];

    const deletedData: number[] = [];
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
        } else if (targetData.next === -1) {
          data[targetData.before].next = targetData.next;
          cursor = targetData.before;
        } else {
          data[targetData.before].next = targetData.next;
          data[targetData.next].before = targetData.before;
          cursor = targetData.next;
        }
        deletedData.push(targetData.no);
      }

      if (c === "Z") {
        const targetNum = deletedData.pop() as number;
        data[targetNum].deleted = false;

        const beforeDataIdx = data[targetNum].before;
        const nextDataIdx = data[targetNum].next;
        if (beforeDataIdx === -1) {
          data[nextDataIdx].before = targetNum;
        } else if (nextDataIdx === -1) {
          data[beforeDataIdx].next = targetNum;
        } else {
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
          if (data[cursor][direction] === -1) break;
          cursor = data[cursor][direction];
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].deleted) result.push("X");
      else result.push("O");
    }
    return result.join("");
  }
}

console.log(
  EditTable2.solution(8, 2, [
    "D 2",
    "C",
    "U 3",
    "C",
    "D 4",
    "C",
    "U 2",
    "Z",
    "Z",
  ])
);
