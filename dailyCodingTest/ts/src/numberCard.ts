namespace NumberCard {
  //   const getArrayOfCD = (arrayA: number[]) => {
  //     const commonDivisorsOfFirstNumber = [];

  //     for (let i = 1; i <= arrayA[0]; i++) {
  //       if (arrayA[0] % i === 0) commonDivisorsOfFirstNumber.push(i);
  //     }
  //     let CD: number = 1;
  //     while (commonDivisorsOfFirstNumber) {
  //       CD = commonDivisorsOfFirstNumber.pop() as number;
  //       let canDivide = true;
  //       for (const num of arrayA) {
  //         if (num % CD !== 0) {
  //           canDivide = false;
  //           break;
  //         }
  //       }
  //       if (canDivide) break;
  //     }
  //     const arrayOfCommonDivisor: number[] = [];
  //     for (let i = 1; i <= CD; i++) {
  //       if (CD % i === 0) arrayOfCommonDivisor.push(i);
  //     }
  //     return arrayOfCommonDivisor;
  //   };

  //   export const solution = (arrayA: number[], arrayB: number[]) => {
  //     const CD_A = getArrayOfCD(arrayA);
  //     const CD_B = getArrayOfCD(arrayB);

  //     const GCD_A = CD_A[CD_A.length - 1];
  //     const GCD_B = CD_B[CD_B.length - 1];

  //     let result: number = 1;
  //     for (let i = CD_A.length - 1; i >= 0; i--) {
  //       if (GCD_B % CD_A[i] === 0) continue;
  //       let dontDivideB = true;
  //       for (const bElement of arrayB) {
  //         if (bElement % CD_A[i] === 0) {
  //           dontDivideB = false;
  //           break;
  //         }
  //       }
  //       if (dontDivideB) {
  //         result = CD_A[i];
  //         break;
  //       }
  //     }

  //     for (let i = CD_B.length - 1; i >= 0; i--) {
  //       if (result >= CD_B[i]) break;
  //       if (GCD_A % CD_B[i] === 0) continue;
  //       let dontDivideA = true;
  //       for (const aElement of arrayA) {
  //         if (aElement % CD_B[i] === 0) {
  //           dontDivideA = false;
  //           break;
  //         }
  //         if (dontDivideA) {
  //           result = CD_B[i];
  //           break;
  //         }
  //       }
  //     }
  //     if (result === 1) return 0;
  //     return result;
  //   };

  export const getGCD = (arrayA: number[]) => {
    const commonDivisorsOfFirstNumber = [];

    for (let i = 1; i <= arrayA[0]; i++) {
      if (arrayA[0] % i === 0) commonDivisorsOfFirstNumber.push(i);
    }

    while (commonDivisorsOfFirstNumber) {
      let CD = commonDivisorsOfFirstNumber.pop() as number;
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

  export const solution = (arrayA: number[], arrayB: number[]) => {
    const GCD_A = getGCD(arrayA);
    const GCD_B = getGCD(arrayB);

    return GCD_A > GCD_B ? GCD_A : GCD_B;
  };
}

console.log(NumberCard.solution([10, 20], [5, 17]));
