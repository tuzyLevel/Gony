// function solution(numbers: number[]) {
//   return numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
// }

// function solution(array: number[], n: number) {
//   let result = 0;
//   array.forEach((val) => {
//     if (val === n) result++;
//   });
//   return result;
// }

//[0, 5], [3, 9], [1, 10]
// function solution(lines: Array<number[]>) {
//   let result = 0;
//   const copy_lines = [];
//   for (let i = 0; i < lines.length; i++) {
//     const line = [Math.min(...lines[i]), Math.max(...lines[i])];
//     copy_lines.push(line);
//   }
//   copy_lines.sort((x, y) => x[0] - y[0]);
//   console.log(copy_lines);
//   //   for (let i = 0; i < lines.length; i++) {
//   //     for (let j = i + 1; j < lines.length; j++) {
//   //       if()

//   //     }
//   //   }
//   return result;
// }

// console.log([
//   [0, 5],
//   [3, 9],
//   [1, 10],
// ]);

interface pData {
  priority: number;
  next: pData | null;
}

class pData implements pData {
  priority: number;
  next: pData | null;

  constructor(priority: number, next: pData | null) {
    this.priority = priority;
    this.next = next;
  }
}

const solution = (priorities: number[], location: number): number => {
  let result = 0;
  const priorityObj = {};
  const cQueue = new pData(priorities[0], null);
  for (const priority of priorities) {
  }

  const targetNumber = priorities[location];

  return result;
};

console.log(solution([2, 1, 3, 2], 2));
