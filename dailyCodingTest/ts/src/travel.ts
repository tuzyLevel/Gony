namespace Travel {
  class Node {
    no: number;
    x: number;
    y: number;
    left: Node | null;
    right: Node | null;
    constructor(no: number, x: number, y: number) {
      this.no = no;
      this.x = x;
      this.y = y;
      this.left = null;
      this.right = null;
    }
  }

  class TravelTree {
    root: Node | null;
    constructor() {
      this.root = null;
    }

    insert(node: Node) {
      if (this.root === null) {
        this.root = node;
        return;
      }

      let cursor: Node | null = this.root;
      while (true) {
        if (node.x < cursor.x) {
          if (cursor.left === null) {
            cursor.left = node;
            return;
          } else {
            cursor = cursor?.left;
          }
        } else {
          if (cursor.right === null) {
            cursor.right = node;
            return;
          } else {
            cursor = cursor?.right;
          }
        }
      }
    }

    preTraversal() {
      let result: number[] = [];
      const help = (node: Node | null) => {
        if (node === null) return;
        result.push(node.no);
        help(node.left);
        help(node.right);
      };
      help(this.root);
      return result;
    }

    postTraversal() {
      let result: number[] = [];
      const help = (node: Node | null) => {
        if (node === null) return;
        help(node.left);
        help(node.right);
        result.push(node.no);
      };
      help(this.root);
      return result;
    }
  }

  export const solution = (nodeinfo: [number, number][]) => {
    let newNodeinfo = [];
    for (const [idx, [x, y]] of nodeinfo.entries()) {
      newNodeinfo.push([idx + 1, x, y]);
    }
    newNodeinfo = newNodeinfo.sort(([idx1, x1, y1], [idx2, x2, y2]) => {
      if (y2 === y1) return x1 - x2;
      return y2 - y1;
    });

    const tt = new TravelTree();
    for (const [idx, x, y] of newNodeinfo) {
      tt.insert(new Node(idx, x, y));
    }

    return [tt.preTraversal(), tt.postTraversal()];
  };
}

console.log(
  Travel.solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
