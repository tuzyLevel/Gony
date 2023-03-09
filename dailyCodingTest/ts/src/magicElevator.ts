namespace Elevator {
  const maxIndex = (storey: number) => {
    let index = 1;
    while (true) {
      if (storey / 10 ** index > 1) {
        index++;
      } else return index - 1;
    }
  };

  export const solution = (storey: number) => {
    let result = 0;
    for (let i = maxIndex(storey); i >= 0; i--) {
      const operand = 10 ** i;
      while (true) {
        if (storey - operand < 0) break;
        storey -= operand;
        result += 1;
      }
      if (storey === 0) break;
    }
    return result;
  };
}

console.log(Elevator.solution(16));
