const selectionSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    let smallestValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[smallestValueIndex] > arr[j]) {
        smallestValueIndex = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[smallestValueIndex];
    arr[smallestValueIndex] = temp;
  }
  return arr;
};

console.log(selectionSort([5, 4, 3, 2, 1]));
console.log(selectionSort([3, 4, 2, 5, 1]));
