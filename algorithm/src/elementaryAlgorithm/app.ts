const productOfArray = (array: number[]): number => {
  const num = array.pop();
  if (!num) return 1;
  else return num * productOfArray(array);
};

console.log(productOfArray([1, 2, 3, 10]));
console.log(productOfArray([0]));
