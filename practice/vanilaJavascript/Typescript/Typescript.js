"use strict";
const set = new Set();
console.log(NaN === NaN);
console.log(0 === -0);
set.add(NaN).add(NaN);
console.log(set);
set.add(0).add(-0);
console.log(set);
const set1 = new Set([1, 2, 3]);
console.log(set1.has(2));
console.log(set1.has(4));
const set3 = new Set([1, 2, 3]);
set3.delete(2);
console.log(set3);
set3.delete(1);
console.log(set3);
const set4 = new Set([1, 2, 3]);
set4.clear();
console.log(set4);
const set5 = new Set([1, 2, 3]);
set5.forEach((v, v2, setval) => {
  console.log(v);
});
const set6 = new Set([1, 2, 3]);
console.log(Symbol.iterator in set6);
for (const value of set6) {
  console.log(value);
}
console.log([...set6]);
Set.prototype.intersection = function (set) {
  const result = new Set();
  for (const value of set) {
    if (this.has(value)) result.add(value);
  }
  return result;
};
console.log(new Set([1, 2, 3, 4]).intersection(new Set([3, 4, 5, 6])));
const combination = (arr, selectNumber) => {
  let result = [];
  if (selectNumber === 1) {
    return arr.map((element) => [element]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinationAfterFixed = combination(rest, selectNumber - 1);
    const attached = combinationAfterFixed.map((c) => [fixed, ...c]);
    result.push(...attached);
  });
  return result;
};

console.log(combination([1, 2, 3, 4, 5], 2));
