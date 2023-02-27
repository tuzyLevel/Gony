const divisorCounts = (num: number) => {
  let divider = 2;
  const counts: { [divisor: number]: number } = {};
  while (true) {
    if (num % divider === 0) {
      counts[divider] = counts[divider] ? counts[divider] + 1 : 1;
      num = num / divider;
    } else divider++;
    if (num <= 1) break;
  }
  return counts;
};

const amountsInDan = (num: number) => {
  return Object.values(divisorCounts(num)).reduce((acc, cur) => {
    return acc * (cur + 1);
  }, 1);
};

const tenMDan = (e: number, starts: number[]) => {
  let tmp: number[] = Array<number>(e + 1).fill(0);
  let maxAddr: number[] = Array<number>(e + 1);
  for (let i = 1; i <= e; i++) {
    for (let j = 1; j <= e / i; j++) {
      tmp[i * j]++;
    }
  }
  maxAddr[e] = e;
  for (let i = e - 1; i > 0; i--) {
    tmp[i] >= tmp[maxAddr[i + 1]]
      ? (maxAddr[i] = i)
      : (maxAddr[i] = maxAddr[i + 1]);
  }
  const result = [];
  for (let start of starts) {
    result.push(maxAddr[start]);
  }
  return result;
};

// const tenMDan = (e: number, starts: number[]) => {
//   const numCount: { [num: number]: number } = {};

//   for(let i=1; i<=e; i++){
//     for(let j=1; j<=)
//   }

// };

// const tenMDan = (e: number, starts: number[]) => {
//   const valueCounts: {
//     [i: number]: { amount: number; minNum: number };
//   } = {};
//   const min = Math.min(...starts);
//   valueCounts[e] = { amount: amountsInDan(e), minNum: e };
//   for (let i = e - 1; i >= min; i--) {
//     if (amountsInDan(i) >= valueCounts[i + 1].amount)
//       valueCounts[i] = { amount: amountsInDan(i), minNum: i };
//     else valueCounts[i] = valueCounts[i + 1];
//   }

//   const result = [];
//   for (const start of starts) {
//     result.push(valueCounts[start].minNum);
//   }
//   return result;
// };

// const tenMDan = (e: number, starts: number[]) => {
//   const valueCounts: { [i: number]: number[] } = {};
//   const min = Math.min(...starts);
//   const result = [];
//   for (let i = min; i <= e; i++) {
//     if (!valueCounts[amountsInDan(i)]) {
//       valueCounts[amountsInDan(i)] = [i];
//     } else {
//       valueCounts[amountsInDan(i)].push(i);
//     }
//   }

//   const keys = Object.keys(valueCounts).sort((a, b) => +b - +a);
//   let sorted: number[] = [];
//   for (const key of keys) {
//     sorted = sorted.concat(valueCounts[+key]);
//   }

//   for (const start of starts) {
//     for (const sortedValue of sorted) {
//       if (start <= sortedValue && sortedValue <= e) {
//         result.push(sortedValue);
//         break;
//       }
//     }
//   }
//   return result;
// };

const _Dan = (e: number, starts: number[]) => {
  return tenMDan(e, starts);
};

console.log(_Dan(8, [1, 3, 7]));
