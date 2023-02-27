const arrayMerge = (arr1: number[], arr2: number[]) => {
  let i = 0;
  let j = 0;
  let result: number[] = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  if (i === arr1.length) {
    result = result.concat(arr2.slice(j));
  } else if (j === arr2.length) {
    result = result.concat(arr1.slice(i));
  }

  return result;
};

const mergeSorting = (arr: number[]) => {
  if (arr.length <= 1) {
    return arr;
  }
  const tempArray = arrayMerge(
    mergeSorting(arr.slice(0, Math.floor(arr.length / 2))),
    mergeSorting(arr.slice(Math.floor(arr.length / 2)))
  );
  return tempArray;
};

console.log(mergeSorting([1, 10, 5, 13, 12, 27, 30, 35]));
