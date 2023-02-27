import Collections from "./collections";

namespace DefenseEnemy {
  const q = new Collections.Queue<
    { value: number; round: number; powerCount: number },
    Collections.Node<{ value: number; round: number; powerCount: number }>
  >();

  export function solution(n: number, k: number, enemy: number[]) {
    if (enemy.length <= k) return enemy.length;
    let answer = 0;
    q.enqueue(
      new Collections.Node({ value: enemy[0], round: 0, powerCount: 0 })
    );
    q.enqueue(new Collections.Node({ value: 0, round: 0, powerCount: 1 }));

    while (q.length > 0) {
      const node = q.dequeue()!;
      const { value, round, powerCount } = node.value;

      if (powerCount === k && value + enemy[round + 1] > n) {
        answer = round + 1;
        continue;
      }

      if (powerCount < k) {
        q.enqueue(
          new Collections.Node({
            value: value,
            round: round + 1,
            powerCount: powerCount + 1,
          })
        );
      }

      if (value + enemy[round + 1] <= n) {
        q.enqueue(
          new Collections.Node({
            value: value + enemy[round + 1],
            round: round + 1,
            powerCount: powerCount,
          })
        );
      }
    }

    return answer;
  }
}

console.log(DefenseEnemy.solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
console.log(DefenseEnemy.solution(2, 4, [3, 3, 3, 3]));
