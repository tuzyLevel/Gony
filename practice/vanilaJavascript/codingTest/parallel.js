const combination = (arr, selectNumber) => {
  const result = [];
  if (selectNumber === 1) {
    return arr.map((element) => [element]);
  }

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const temp_comb = combination(rest, selectNumber - 1);
    const attached = temp_comb.map((c) => [fixed, ...c]);
    result.push(...attached);
  });
  return result;
};

function solution(dots) {
  const dotPos = [0, 1, 2, 3];
  const comb = combination([0, 1, 2, 3], 2);
  let result = 0;
  for (const selectedDot of comb) {
    const otherDots = dotPos.filter((dot) => !selectedDot.includes(dot));
    const [x1, y1] = dots[selectedDot[0]];
    const [x2, y2] = dots[selectedDot[1]];
    const [x3, y3] = dots[otherDots[0]];
    const [x4, y4] = dots[otherDots[1]];

    if ((x2 - x1 === 0 && x4 - x3 === 0) || (y2 - y1 === 0 && y4 - y3 === 0)) {
      result++;
    } else if ((y2 - y1) / (x2 - x1) === (y4 - y3) / (x4 - x3)) {
      result++;
    }
  }
  return result / 2;
}

console.log(
  solution([
    [1, 4],
    [9, 2],
    [3, 8],
    [10, 4],
  ])
);
