import HeapFactory from "./heapFactory";

export namespace GraphCollections {
  type WeightedEdge = {
    start: string;
    dest: string;
    weight: number;
  };
  interface Graph {
    addVertex: (vertex: string) => void;
    addEdge:
      | ((target: string, dest: string) => void)
      | ((weightedEdge: WeightedEdge) => boolean);
    removeVertex: (target: string) => boolean;
    removeEdge: (target: string, dest: string) => boolean;
    BFSTraversal?: (root: string) => string[];
    DFSTraversal?: (root: string) => string[];
    DFSTraversalRecursive?: (root: string) => string[];
  }

  interface Weighted extends Graph {
    djikstra: (start: any, dest: any) => any;
  }

  export class UnWeightedGraph implements Graph {
    adjacencyList: { [vertexName: string]: string[] };
    constructor() {
      this.adjacencyList = {};
    }

    addVertex(vertex: string) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(target: string, dest: string) {
      if (!this.adjacencyList[target]) {
        this.addVertex(target);
      }
      if (!this.adjacencyList[dest]) {
        this.addVertex(dest);
      }
      this.adjacencyList[target].push(dest);
      this.adjacencyList[dest].push(target);
    }

    removeVertex(target: string) {
      if (!this.adjacencyList[target] || this.adjacencyList[target].length > 0)
        return false;
      delete this.adjacencyList[target];
      return true;
    }

    removeEdge(target: string, dest: string) {
      //there dont exist vertexes or only isolated vertex
      if (
        (!this.adjacencyList[target] ||
          this.adjacencyList[target].length === 0) &&
        (!this.adjacencyList[dest] || this.adjacencyList[dest].length === 0)
      ) {
        return false;
      }

      //
      if (
        this.adjacencyList[target].indexOf(dest) === -1 ||
        this.adjacencyList[dest].indexOf(target) === -1
      )
        return false;

      this.adjacencyList[target].splice(
        this.adjacencyList[target].indexOf(dest),
        1
      );
      this.adjacencyList[dest].splice(
        this.adjacencyList[dest].indexOf(target),
        1
      );
      return true;
    }

    BFSTraversal(root: string) {
      const keys = Object.keys(this.adjacencyList);
      const visited: { [visited: string]: boolean } = {};
      for (const key of keys) {
        visited[key] = false;
      }
      const bfsTraversal: string[] = [];
      const q: string[] = [];
      q.push(root);
      while (q.length !== 0) {
        const target = q.shift() as string;
        if (!visited[target]) {
          bfsTraversal.push(target);
          for (const child of this.adjacencyList[target]) {
            q.push(child);
          }
          visited[target] = true;
        }
      }
      return bfsTraversal;
    }

    DFSTraversal(root: string) {
      const keys = Object.keys(this.adjacencyList);
      const visited: { [visited: string]: boolean } = {};
      for (const key of keys) {
        visited[key] = false;
      }
      const dfsTraversal: string[] = [];
      const s: string[] = [];
      s.push(root);
      while (s.length !== 0) {
        const target = s.pop() as string;
        if (!visited[target]) {
          dfsTraversal.push(target);
          for (const child of this.adjacencyList[target]) {
            s.push(child);
          }
          visited[target] = true;
        }
      }
      return dfsTraversal;
    }

    DFSTraversalRecursive(root: string) {
      const visited: { [visited: string]: boolean } = {};
      const result: string[] = [];
      const traversal = (vertex: string) => {
        if (visited[vertex] === undefined || visited[vertex] === false) {
          visited[vertex] = true;
          result.push(vertex);
          for (const child of this.adjacencyList[vertex]) {
            traversal(child);
          }
        }
      };

      traversal(root);
      return result;
    }
  }

  export class WeightedGraph implements Weighted {
    adjacencyList: { [vertex: string]: { vertex: string; weight: number }[] };
    constructor() {
      this.adjacencyList = {};
    }

    addVertex(vertex: string) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(weightedEdge: WeightedEdge) {
      if (
        !this.adjacencyList[weightedEdge.start] ||
        //   this.adjacencyList[weightedEdge.start].length === 0) &&
        !this.adjacencyList[weightedEdge.dest]
        // this.adjacencyList[weightedEdge.dest].length === 0
      ) {
        return false;
      }
      this.adjacencyList[weightedEdge.start].push({
        vertex: weightedEdge.dest,
        weight: weightedEdge.weight,
      });
      this.adjacencyList[weightedEdge.dest].push({
        vertex: weightedEdge.start,
        weight: weightedEdge.weight,
      });
      return true;
    }

    removeEdge(target: string, dest: string) {
      return true;
    }

    removeVertex(target: string) {
      return true;
    }

    djikstra(start: string, finish: string) {
      const pq = new HeapFactory.CustomHeap<{ vertex: string; value: number }>(
        (a, b) => a < b
      );
      const distances: { [vertex: string]: number } = {};
      const previous: { [vertex: string]: null | string } = {};

      let path = [];

      //build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          pq.insert({ vertex, value: 0 });
        } else {
          distances[vertex] = Infinity;
          // pq.insert({ vertex, value: Infinity });
        }
        previous[vertex] = null;
      }

      while (pq.arr.length > 0) {
        let smallest = pq.extractTop()!.vertex;

        if (smallest === finish) {
          let tracker: string | null = smallest;
          while (true) {
            if (tracker === null) break;
            path.push(tracker);

            tracker = previous[tracker];
          }
          break;
        }
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            let nextNode = this.adjacencyList[smallest][neighbor];
            let nextNeighbor = nextNode.vertex;
            let candidate = distances[smallest] + nextNode.weight;
            if (candidate < distances[nextNeighbor]) {
              distances[nextNeighbor] = candidate;

              previous[nextNeighbor] = smallest;

              pq.insert({ vertex: nextNeighbor, value: candidate });
            }
          }
        }
      }

      return path.reverse();
    }
  }
}

// const g = new GraphColltions.UnWeightedGraph();

// g.addVertex("Tokyo");
// g.addVertex("Seoul");
// g.addVertex("Paris");
// g.addVertex("NewYork");

// g.addEdge("Tokyo", "Seoul");
// g.addEdge("Tokyo", "NewYork");
// g.addEdge("Tokyo", "Paris");
// g.addEdge("Paris", "NewYork");

// g.addEdge("Seoul", "Daegu");
// g.addEdge("Seoul", "NewYork");
// g.addEdge("Seoul", "Paris");
// g.addEdge("Seoul", "Pusan");

// console.log(g.BFSTraversal("Seoul"));
// console.log(g.DFSTraversal("Seoul"));
// console.log(g.DFSTraversalRecursive("Seoul"));

const wg = new GraphCollections.WeightedGraph();
wg.addVertex("A");
wg.addVertex("B");
wg.addVertex("C");
wg.addVertex("D");
wg.addVertex("E");
wg.addVertex("F");
// console.log(wg.adjacencyList);
// console.log(wg.addEdge({ start: "Daegu", dest: "Gyeongju", weight: 3 }));
// console.log(wg.adjacencyList);
wg.addEdge({ start: "A", dest: "B", weight: 4 });
wg.addEdge({ start: "A", dest: "C", weight: 2 });
wg.addEdge({ start: "B", dest: "E", weight: 3 });
wg.addEdge({ start: "C", dest: "D", weight: 2 });
wg.addEdge({ start: "C", dest: "F", weight: 4 });
wg.addEdge({ start: "D", dest: "E", weight: 3 });
wg.addEdge({ start: "D", dest: "F", weight: 1 });
wg.addEdge({ start: "E", dest: "F", weight: 1 });

// console.log(wg.adjacencyList);
console.log(wg.djikstra("A", "E"));
