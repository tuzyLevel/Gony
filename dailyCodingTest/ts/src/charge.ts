namespace Charge {
  const getChangeCount = (n: number, money: number[]) => {
    let totalCount = 0;
    
    let window = 0;
    const digitCounts = Array<number>(money.length);
    for (let i = 0; i < digitCounts.length; i++) digitCounts[i] = 0;
    money = money.sort((a, b) => a - b);
    while(true){
      
    }
  };

  export function solution(n: number, money: number[]) {
    let answer = 0;
    return getChangeCount(n, money);
  }
}

Charge.solution(5, [1, 2, 5]);
