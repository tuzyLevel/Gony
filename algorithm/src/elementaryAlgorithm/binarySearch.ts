function binarySearch(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (arr[middle] < target) {
      left = middle + 1;
    } else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 10, 11, 12], 5));
console.log(binarySearch([1, 3, 5, 7, 9, 10, 11, 12], 15));
