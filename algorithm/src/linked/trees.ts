namespace Trees {
  type Nodeable = Node | null;

  class Node {
    value;
    leftChild: Nodeable;
    rightChild: Nodeable;
    constructor(value: any) {
      this.value = value;
      this.leftChild = null;
      this.rightChild = null;
    }
  }

  export class BinarySearchTree {
    root: Nodeable;

    constructor() {
      this.root = null;
    }

    insert(value: any) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
        return true;
      }
      let curNode = this.root;
      while (true) {
        if (curNode.value === value) return false;
        else if (curNode.value > value) {
          if (curNode.leftChild === null) {
            curNode.leftChild = newNode;
            return true;
          }
          curNode = curNode.leftChild;
        } else {
          if (curNode.rightChild === null) {
            curNode.rightChild = newNode;
            return true;
          }
          curNode = curNode.rightChild;
        }
      }
    }

    find(value: any) {
      let curNode = this.root;
      while (true) {
        if (curNode === null) return false;
        else if (curNode.value === value) return true;
        else if (curNode.value > value) {
          curNode = curNode.leftChild;
        } else {
          curNode = curNode.rightChild;
        }
      }
    }

    BFS() {
      const q: Nodeable[] = [];
      let visited: any[] = [];
      q.push(this.root);
      let targetNode: Nodeable;
      while (q.length > 0) {
        targetNode = q.shift()!;
        visited.push(targetNode.value);
        if (targetNode.leftChild) q.push(targetNode.leftChild);
        if (targetNode.rightChild) q.push(targetNode.rightChild);
      }

      return visited;
    }

    DFSPreOrder() {
      const stack = [];
      let visited: any = [];
      stack.push(this.root);
      let targetNode: Nodeable;
      while (stack.length > 0) {
        targetNode = stack.pop()!;
        visited.push(targetNode.value);
        if (targetNode.rightChild) stack.push(targetNode.rightChild);
        if (targetNode.leftChild) stack.push(targetNode.leftChild);
      }

      return visited;
    }

    DFSPostOrder() {
      const data: Nodeable[] = [];
      function traverse(node: Nodeable) {
        if (node !== null) {
          if (node.leftChild) traverse(node.leftChild);
          if (node.rightChild) traverse(node.rightChild);
          data.push(node.value);
        }
      }
      traverse(this.root);
      return data;
    }

    DFSInOrder() {
      const data: Nodeable[] = [];
      function traverse(node: Nodeable) {
        if (node !== null) {
          if (node.leftChild) traverse(node.leftChild);
          data.push(node.value);
          if (node.rightChild) traverse(node.rightChild);
        }
      }
      traverse(this.root);
      return data;
    }
  }
}

const bst = new Trees.BinarySearchTree();
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);

console.log(bst.root);

console.log(bst.find(2));

console.log(bst.find(4));
console.log(bst.find(100));

console.log(bst.BFS());
console.log(bst.DFSPreOrder());
console.log(bst.DFSPostOrder());
console.log(bst.DFSInOrder());
