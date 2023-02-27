const collectOddNumbers = (arr: number[]): number[] => {
  let newArr = [];

  if (arr[0] % 2 === 1) newArr.push(arr[0]);
  if (arr.length === 0) return newArr;

  newArr = newArr.concat(collectOddNumbers(arr.slice(1)) as number[]);

  return newArr;
};

console.log(collectOddNumbers([1, 2, 3, 4, 5]));
