import path from "path";

//get seperator
console.log(`path.sep : ${path.sep}`);
//Environment Path Seperator(delimiter)
console.log(`path.delimiter ${path.delimiter}`);

console.log("-".repeat(10));

//Path of Directory
console.log(`path.dirname() : ${path.dirname(__filename)}`);
//File Name
console.log(`path.basename() : ${path.basename(__filename)}`);
//Extension Name
console.log(`path.extname() : ${path.extname(__filename)}`);
//
console.log(
  `path.basename() - path.extname(): ${path.basename(
    __filename,
    path.extname(__filename)
  )}`
);

console.log(
  `path.format() : ${path.format({
    dir: "/User/park/Programming",
    name: "path",
    ext: ".js",
  })}`
);

const combination = (arr: number[], selectNumber: number) => {
  const result: Array<number[]> = [];

  if (selectNumber === 1) {
    return arr.map((element) => [element]);
  }
  arr.forEach((fixed: number, index: number, origin: number[]) => {
    const rest = origin.slice(index + 1);
    const combinationAfterFixed = combination(rest, selectNumber - 1);
    const attached = combinationAfterFixed.map((c) => [fixed, ...c]);
    result.push(...attached);
  });

  return result;
};

console.log(combination([1, 2, 3, 4, 5], 2));
console.log(combination([1, 2, 3, 4, 5], 1));

//Permutation
const permutator = (inputArr: number[]) => {
  let result: Array<number[]> = [];

  const permute = (arr: number[], m: number[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = origin.slice();
        // let next = curr.splice(i, 1);
        // permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

console.log(permutator([1, 2, 3, 4]));
