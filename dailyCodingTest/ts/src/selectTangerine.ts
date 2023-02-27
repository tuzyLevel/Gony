const selection = (k: number, tangerine: number[]) => {
  const countObj: { [key: string]: number } = {};

  for (let i = 0; i < tangerine.length; i++) {
    countObj[tangerine[i]] = countObj[tangerine[i]]
      ? countObj[tangerine[i]] + 1
      : 1;
  }
  const arr = [];
  for (const index in countObj) {
    arr.push([Number(index), countObj[index]]);
  }

  arr.sort((x: number[], y: number[]) => y[1] - x[1]);
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    result += arr[i][1];
    if (result >= k) return i + 1;
  }
  return -1;
};

const solution = (k: number, tangerine: number[]) => {
  return selection(k, tangerine);
};

solution(6, [1, 3, 2, 5, 4, 5, 2, 3]);
