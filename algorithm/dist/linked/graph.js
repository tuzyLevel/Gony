"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCollections = void 0;
const heapFactory_1 = __importDefault(require("./heapFactory"));
var GraphCollections;
(function (GraphCollections) {
    class UnWeightedGraph {
        constructor() {
            this.adjacencyList = {};
        }
        addVertex(vertex) {
            if (!this.adjacencyList[vertex])
                this.adjacencyList[vertex] = [];
        }
        addEdge(target, dest) {
            if (!this.adjacencyList[target]) {
                this.addVertex(target);
            }
            if (!this.adjacencyList[dest]) {
                this.addVertex(dest);
            }
            this.adjacencyList[target].push(dest);
            this.adjacencyList[dest].push(target);
        }
        removeVertex(target) {
            if (!this.adjacencyList[target] || this.adjacencyList[target].length > 0)
                return false;
            delete this.adjacencyList[target];
            return true;
        }
        removeEdge(target, dest) {
            //there dont exist vertexes or only isolated vertex
            if ((!this.adjacencyList[target] ||
                this.adjacencyList[target].length === 0) &&
                (!this.adjacencyList[dest] || this.adjacencyList[dest].length === 0)) {
                return false;
            }
            //
            if (this.adjacencyList[target].indexOf(dest) === -1 ||
                this.adjacencyList[dest].indexOf(target) === -1)
                return false;
            this.adjacencyList[target].splice(this.adjacencyList[target].indexOf(dest), 1);
            this.adjacencyList[dest].splice(this.adjacencyList[dest].indexOf(target), 1);
            return true;
        }
        BFSTraversal(root) {
            const keys = Object.keys(this.adjacencyList);
            const visited = {};
            for (const key of keys) {
                visited[key] = false;
            }
            const bfsTraversal = [];
            const q = [];
            q.push(root);
            while (q.length !== 0) {
                const target = q.shift();
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
        DFSTraversal(root) {
            const keys = Object.keys(this.adjacencyList);
            const visited = {};
            for (const key of keys) {
                visited[key] = false;
            }
            const dfsTraversal = [];
            const s = [];
            s.push(root);
            while (s.length !== 0) {
                const target = s.pop();
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
        DFSTraversalRecursive(root) {
            const visited = {};
            const result = [];
            const traversal = (vertex) => {
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
    GraphCollections.UnWeightedGraph = UnWeightedGraph;
    class WeightedGraph {
        constructor() {
            this.adjacencyList = {};
        }
        addVertex(vertex) {
            if (!this.adjacencyList[vertex])
                this.adjacencyList[vertex] = [];
        }
        addEdge(weightedEdge) {
            if (!this.adjacencyList[weightedEdge.start] ||
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
        removeEdge(target, dest) {
            return true;
        }
        removeVertex(target) {
            return true;
        }
        djikstra(start, finish) {
            const pq = new heapFactory_1.default.CustomHeap((a, b) => a < b);
            const distances = {};
            const previous = {};
            let path = [];
            //build up initial state
            for (let vertex in this.adjacencyList) {
                if (vertex === start) {
                    distances[vertex] = 0;
                    pq.insert({ vertex, value: 0 });
                }
                else {
                    distances[vertex] = Infinity;
                    // pq.insert({ vertex, value: Infinity });
                }
                previous[vertex] = null;
            }
            while (pq.arr.length > 0) {
                let smallest = pq.extractTop().vertex;
                if (smallest === finish) {
                    let tracker = smallest;
                    while (true) {
                        if (tracker === null)
                            break;
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
    GraphCollections.WeightedGraph = WeightedGraph;
})(GraphCollections = exports.GraphCollections || (exports.GraphCollections = {}));
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
