const insertSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
};

console.log(insertSort([5, 4, 3, 2, 1]));
console.log(insertSort([3, 4, 2, 5, 1]));
