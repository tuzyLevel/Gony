const getGCD = (arrayA) => {
  const commonDivisorsOfFirstNumber = [];

  for (let i = 1; i <= arrayA[0]; i++) {
    if (arrayA[0] % i === 0) commonDivisorsOfFirstNumber.push(i);
  }

  while (commonDivisorsOfFirstNumber) {
    let CD = commonDivisorsOfFirstNumber.pop();
    let canDivide = true;
    for (const num of arrayA) {
      if (num % CD !== 0) {
        canDivide = false;
        break;
      }
    }
    if (canDivide) return CD;
  }
  return 1;
};

const divideCards = (arrayA, arrayB) => {
  const GCDA = getGCD(arrayA);
  const GCDB = getGCD(arrayB);
  console.log(GCDA, GCDB);
  let result = 0;
  for (let i = GCDA; i > 1; i--) {
    let noExistDividedOne = true;
    if (GCDA % i !== 0) continue;

    for (const num of arrayB) {
      if (num % i === 0) noExistDividedOne = false;
      break;
    }

    if (noExistDividedOne) {
      result = i;
      break;
    }
  }
  for (let i = GCDB; i > 1; i--) {
    let noExistDividedOne = true;
    if (i <= result) break;
    if (GCDB % i !== 0) continue;

    for (const num of arrayB) {
      if (num % i === 0) noExistDividedOne = false;
      break;
    }

    if (noExistDividedOne) {
      result = i;
      break;
    }
  }
  return result;
};

const solution = (arrayA, arrayB) => {
  return divideCards(arrayA, arrayB);
};

console.log(solution([10, 17], [5, 20]));
console.log(solution([10, 20], [5, 17]));

// console.log(solution([10, 20], [5, 17]));
