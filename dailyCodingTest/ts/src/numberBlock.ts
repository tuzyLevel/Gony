namespace NumberBlock {
  const secondaryBiggestDivisor = (num: number) => {
    if (num === 1) return 0;
    let divisor = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisor = i;
        if (num / i <= 10000000) return num / i;
      }
    }

    return divisor;
  };

  export function solution(begin: number, end: number) {
    const result: number[] = [];

    for (let i = begin; i <= end; i++) {
      result.push(secondaryBiggestDivisor(i));
    }

    return result;
  }
}

console.log(NumberBlock.solution(1, 10));
