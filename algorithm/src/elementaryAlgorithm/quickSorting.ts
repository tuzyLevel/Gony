const getPivotIndex = (arr: number[], start = 0, end = arr.length - 1) => {
  let swapIndex = start; // same the number of less than pivot
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < arr[0]) {
      swapIndex++;
      const temp = arr[i];
      arr[i] = arr[swapIndex];
      arr[swapIndex] = temp;
    }
  }
  const temp = arr[start];
  arr[start] = arr[swapIndex];
  arr[swapIndex] = temp;

  return swapIndex;
};

const quickSorting = (arr: number[], left = 0, right = arr.length - 1) => {
  if (left < right) {
    let pivotIndex = getPivotIndex(arr, left, right);
    quickSorting(arr, left, pivotIndex - 1);
    quickSorting(arr, pivotIndex + 1, right);
  }

  return arr;
};

console.log(quickSorting([3, 4, 2, 1, 5], 0, 4));
