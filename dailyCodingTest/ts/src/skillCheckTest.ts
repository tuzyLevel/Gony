namespace SkillCheckTest {
  export const problem1 = (n: number) => {
    const arr = Array<number>(100000);
    arr[0] = 0;
    arr[1] = 1;
    const fibonacci = (n: number): number => {
      if (arr[n] !== undefined) return arr[n];
      arr[n] = fibonacci(n - 2) + fibonacci(n - 1);
      return arr[n];
    };

    const solution = (n: number) => {
      return fibonacci(n) % 1234567;
    };

    return solution(n);
  };
}

console.log(SkillCheckTest.problem1(2));
console.log(SkillCheckTest.problem1(3));
console.log(SkillCheckTest.problem1(4));
