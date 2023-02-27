namespace Defends {
  class Node {}
}

const defends = (n: number, k: number, enemy: number[]) => {
  if (k >= enemy.length) return enemy.length;

  const bigKthEnemy = enemy.slice(0, k);
  

  

  for (let round = k; round < enemy.length; round++) {
    bigKthEnemy.push(enemy[round]);
    
  }
};

const _3 = (n: number, k: number, enemy: number[]) => {};
