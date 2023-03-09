namespace ThreeByOneTile {
  export const solution = (n: number) => {
    if (n % 2 === 1) return 0;
    //짝수만있기에 절반으로 나눠서 사용
    const dp = [];
    dp[0] = 1n;
    dp[1] = 3n;
    for (let i = 2; i <= n / 2; i++) {
      dp[i] = 4n * dp[i - 1] - dp[i - 2];
    }
    return dp[n / 2] % 1000000007n;
  };
}

console.log(ThreeByOneTile.solution(2));
console.log(ThreeByOneTile.solution(4));
console.log(ThreeByOneTile.solution(6));
console.log(ThreeByOneTile.solution(8));
