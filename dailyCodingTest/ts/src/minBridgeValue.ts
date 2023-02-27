namespace MinBridgeValue {
  export const solution = (n: number, costs: [number, number, number][]) => {
    let result = 0;
    let count = 0;
    const set = Array<number>(n);

    for (let i = 0; i < set.length; i++) set[i] = i;

    costs = costs.sort(([s1, d1, w1], [s2, d2, w2]) => {
      return w1 - w2;
    });

    for (const [s, d, w] of costs) {
      if (set[s] === set[d]) continue;
      let mainSet, beUnitedSet;
      if (set[s] < set[d]) {
        mainSet = set[s];
        beUnitedSet = set[d];
      } else {
        mainSet = set[d];
        beUnitedSet = set[s];
      }
      for (let i = 0; i < set.length; i++) {
        if (set[i] === beUnitedSet) set[i] = mainSet;
      }
      result += w;
      count++;
      if (count === n - 1) break;
    }

    return result;
  };
}

console.log(
  MinBridgeValue.solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
console.log(
  MinBridgeValue.solution(5, [
    [0, 1, 1],
    [0, 2, 2],
    [0, 3, 3],
    [0, 4, 4],
    [1, 3, 1],
  ])
);
console.log(
  MinBridgeValue.solution(5, [
    [0, 1, 1],
    [3, 1, 1],
    [0, 2, 2],
    [0, 3, 2],
    [0, 4, 100],
  ])
);
console.log(
  MinBridgeValue.solution(5, [
    [0, 1, 5],
    [1, 2, 3],
    [2, 3, 3],
    [3, 1, 2],
    [3, 0, 4],
    [2, 4, 6],
    [4, 0, 7],
  ])
);
console.log(
  MinBridgeValue.solution(7, [
    [2, 3, 7],
    [3, 6, 13],
    [3, 5, 23],
    [5, 6, 25],
    [0, 1, 29],
    [1, 5, 34],
    [1, 2, 35],
    [4, 5, 53],
    [0, 4, 75],
  ])
);
console.log(
  MinBridgeValue.solution(5, [
    [0, 1, 5],
    [1, 2, 3],
    [2, 3, 3],
    [3, 1, 2],
    [3, 0, 4],
    [2, 4, 6],
    [4, 0, 7],
  ])
);
