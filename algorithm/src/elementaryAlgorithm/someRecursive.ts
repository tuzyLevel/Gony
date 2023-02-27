const isOdd = (val: number) => {
  return val % 2 !== 0;
};

type callBack = (n: number) => boolean;

const someRecursive = (arr: number[], f: callBack): boolean => {
  if (arr.length === 0) return false;

  return f(arr.pop() as number) || someRecursive(arr, f);
};

console.log(someRecursive([1, 2, 3, 4], isOdd));
console.log(someRecursive([4, 6, 8, 9], isOdd));
console.log(someRecursive([4, 6, 8], isOdd));
console.log(someRecursive([4, 6, 8], (val) => val > 10));
