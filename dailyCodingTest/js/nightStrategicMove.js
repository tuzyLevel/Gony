const howLongCanMove = (distance, scope, times) => {
  let result = distance;
  for (let i = 0; i < scope.length; i++) {
    for (let j = Math.min(...scope[i]); j <= Math.max(...scope[i]); j++) {
      if (j > result) break;

      let time = j % (times[i][0] + times[i][1]);
      if (time === 0) time = times[i][0] + times[i][1];
      if (time <= times[i][0] && j < result) {
        result = j;
      }
    }
  }
  return result;
};
//[[3, 4], [5, 8]],	[[2, 5], [4, 3]]
const solution = (distance, scope, times) => {
  return howLongCanMove(distance, scope, times);
};
console.log(
  solution(
    10,
    [
      [3, 4],
      [5, 8],
    ],
    [
      [2, 5],
      [4, 3],
    ]
  )
);

console.log(
  solution(
    12,
    [
      [7, 8], //7
      [4, 6], // 4~5
      [11, 10], // 10
    ],
    [
      [2, 2],
      [2, 4],
      [3, 3],
    ]
  )
);
