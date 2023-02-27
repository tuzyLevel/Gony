namespace LightHouse {
  // export const solution_1 = (n: number, lighthouse: number[][]) => {
  //   //setting edges
  //   let totalCount = 0;
  //   let edges: {
  //     [start: number]: { [dest: number | string]: boolean | number };
  //   } = {};
  //   for (let i = 1; i <= n; i++) {
  //     edges[i] = {};
  //     edges[i]["count"] = 0;
  //   }
  //   for (const [s, d] of lighthouse) {
  //     edges[s][d] = true;
  //     (edges[s]["count"] as number)++;
  //     edges[d][s] = true;
  //     (edges[d]["count"] as number)++;
  //     totalCount += 1;
  //   }
  //   let result = 0;

  //   //search large amount of inner edges
  //   while (true) {
  //     if (totalCount === 0) break;
  //     let largeAmountOfInnerEdges = 0;
  //     let count = 0;
  //     for (let houseNumber of Object.keys(edges)) {
  //       let lightHouseNumber = +houseNumber;
  //       if (edges[lightHouseNumber]["count"] > count) {
  //         largeAmountOfInnerEdges = lightHouseNumber;
  //         count = +edges[lightHouseNumber]["count"];
  //       }
  //     }
  //     for (const linkedLightHouse in edges[largeAmountOfInnerEdges]) {
  //       const linkedHouseNumber = +linkedLightHouse;
  //       if (Number.isInteger(linkedHouseNumber)) {
  //         delete edges[linkedHouseNumber][largeAmountOfInnerEdges];
  //         (edges[linkedHouseNumber]["count"] as number)--;
  //         totalCount--;
  //       }
  //     }
  //     result++;
  //     delete edges[largeAmountOfInnerEdges];
  //   }

  //   return result;
  // };

  // export function solution_2(n: number, lighthouse: number[][]) {
  //   let totalCount = 0;

  //   // let edges: {
  //   //   start: number;
  //   //   dest: { [dest: number]: number };
  //   //   count: number;
  //   // }[] = [];

  //   let edges: {
  //     [start: number]: { dest: { [d: number]: number }; count: number };
  //   } = {};

  //   //O(n)
  //   for (let i = 1; i <= n; i++) {
  //     edges[i] = { dest: {}, count: 0 };
  //   }

  //   //O(n)
  //   for (const [s, d] of lighthouse) {
  //     edges[s].dest[d] = 1;
  //     edges[s].count++;
  //     edges[d].dest[s] = 1;
  //     edges[d].count++;
  //     totalCount += 1;
  //   }

  //   const innerEdges = [];
  //   for (const key in edges) {
  //     innerEdges.push([key, edges[key].count]);
  //   }

  //   innerEdges.sort(([key1, count1], [key2, count2]) => +count1 - +count2);

  //   // while (innerEdges.length > 0) {
  //   //   const [node, innerEdgeCounts] = innerEdges.pop() as [number, number];

  //   //   // if(innerEdgeCounts )
  //   // }

  //   return innerEdges;
  // }
  export const solution = (n: number, lighthouse: [number, number][]) => {
    let result = 0;
    while (lighthouse.length > 0) {
      const obj: { [num: number]: number } = {};

      for (const [n1, n2] of lighthouse) {
        if (!obj[n1]) obj[n1] = 1;
        else obj[n1]++;
        if (!obj[n2]) obj[n2] = 1;
        else obj[n2]++;
      }

      const mostCountValue = Object.entries(obj).sort(
        ([key1, value1], [key2, value2]) => {
          return value2 - value1;
        }
      )[0][0];

      result++;
      lighthouse = lighthouse.filter(([n1, n2]) => {
        return n1 !== +mostCountValue && n2 !== +mostCountValue;
      });
    }
    return result;
  };
}

console.log(
  LightHouse.solution(8, [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ])
);
console.log(
  LightHouse.solution(10, [
    [4, 1],
    [5, 1],
    [5, 6],
    [7, 6],
    [1, 2],
    [1, 3],
    [6, 8],
    [2, 9],
    [9, 10],
  ])
);
