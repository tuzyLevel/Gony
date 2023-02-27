const subSequence = (elements) => {
  const sumSet = new Set();
  for (let offset = 0; offset < elements.length; offset++) {
    //offset
    // length

    let windowSum = (() => {
      let sum = 0;
      for (let k = 0; k <= offset; k++) sum += elements[k];
      return sum;
    })();
    sumSet.add(windowSum);
    for (let j = 1; j < elements.length; j++) {
      windowSum =
        windowSum - elements[j - 1] + elements[(j + offset) % elements.length];
      sumSet.add(windowSum);
    }
  }
  return sumSet.size;
};

function solution(elements) {
  return subSequence(elements);
}

console.log(solution([7, 9, 1, 1, 4, 5]));
