const digitCount = (num: number) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

const getDigit = (num: number, place: number) => {
  return Math.floor(Math.abs(num) / 10 ** place) % 10;
};

const mostDigits = (arr: number[]) => {
  let mostDigit = 0;
  for (const num of arr) {
    const digit = digitCount(num);
    mostDigit = mostDigit < digit ? digit : mostDigit;
  }
  return mostDigit;
};

const radixSorting = (arr: number[]) => {
  let list = arr.slice();
  const mostDigit = mostDigits(arr);
  for (let i = 0; i < mostDigit; i++) {
    const tempBucket: number[][] = [];
    for (let i = 0; i < 10; i++) tempBucket.push([]);
    for (const num of list) {
      tempBucket[getDigit(num, i)].push(num);
    }
    list = tempBucket.flat();
  }
  return list;
};

// console.log(digitCount(3124));
// console.log(digitCount(-231455));
// console.log(digitCount(0));
// console.log(digitCount(51403));
// console.log(digitCount(98102));
// console.log(digitCount(3124));
// console.log(digitCount(3124));

// console.log(mostDigits([2134, 5555555, 97, 0, 918491571]));
// console.log(getDigit(3124, 0));
// console.log(getDigit(3124, 1));
// console.log(getDigit(3124, 2));
// console.log(getDigit(3124, 3));
// console.log(getDigit(3124, 4));
// console.log(getDigit(3124, 5));
console.log(radixSorting([351, 1254, 22, 4998101, 5]));
