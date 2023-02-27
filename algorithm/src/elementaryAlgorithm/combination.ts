const combination = (arr: number[], num: number) => {};

const permutation = (arr: number[], totalNum: number): number[][] => {
  const result: number[][] = [];
  const helper = (arr: number[], selected: number[]) => {
    if (selected.length === totalNum) {
      result.push(selected);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const resultArr = selected.slice();
      const copyArr = arr.slice();
      resultArr.push(copyArr[i]);
      copyArr.splice(i, 1);
      helper(copyArr, resultArr);
    }
  };
  helper(arr, []);
  return result;
};

const permutation2 = (
  arr: number[],
  totalNum: number,
  selected: number[],
  result: number[][]
): number[][] | void => {
  if (selected.length === totalNum) {
    result.push(selected);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const resultArr = selected.slice();
    const copyArr = arr.slice();
    resultArr.push(copyArr[i]);
    copyArr.splice(i, 1);
    permutation2(copyArr, totalNum, resultArr, result);
  }

  return result;
};

console.log(permutation2([1, 2, 3, 4, 5], 2, [], []));
// console.log([1, 2, 3, 4, 5].splice(1, 1));
