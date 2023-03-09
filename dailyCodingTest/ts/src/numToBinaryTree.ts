namespace NumToBinaryTree {
  const getMaxLength = (binaryNum: string) => {
    let digit = 1;
    while (true) {
      if (
        2 ** (digit - 1) - 1 < binaryNum.length &&
        binaryNum.length <= 2 ** digit - 1
      ) {
        return 2 ** digit - 1;
      }
      digit++;
    }
  };

  const checkPossibleBinaryTree = (fullBinaryNum: string) => {
    const help = (s: number, e: number) => {
      if (s === e) return fullBinaryNum[s];
      const root = Math.floor((s + e) / 2);
      if (fullBinaryNum[root] === "0") {
      }
      const leftEnd = root - 1;
      const rightStart = root + 1;
    };
  };

  export const solution = (numbers: number[]) => {
    const result: number[] = [];
    for (const num of numbers) {
      const binaryNum = num.toString(2);
      const maxLength = getMaxLength(binaryNum);

      console.log(`${num} maxLength : ${maxLength}`);

      const zeroPaddingLength = maxLength - binaryNum.length;

      const fullBinaryNum = "0".repeat(zeroPaddingLength) + binaryNum;
      const q = [];
      let possible = true;
      // for (let i = zeroPaddingLength; i < fullBinaryNum.length; i++) {
      //   if (
      //     fullBinaryNum[Math.floor(fullBinaryNum.length / 2)] === "0" ||
      //     (i % 2 === 1 &&
      //       fullBinaryNum[i] === "0" &&
      //       (fullBinaryNum[i - 1] === "1" || fullBinaryNum[i + 1] === "1"))
      //   ) {
      //     result.push(0);
      //     possible = false;
      //     break;
      //   }
      // }
      // if (possible) result.push(1);
      if (fullBinaryNum[Math.floor(fullBinaryNum.length / 2)] === "0") {
        result.push(0);
        continue;
      }
      for (let i = 0; i < fullBinaryNum.length; i += 2) {
        q.push(i);
      }
      while (q.length > 1) {
        const leftPos = q.shift() as number;
        const rightPos = q.shift() as number;
        const mid = (leftPos + rightPos) / 2;
        if (
          fullBinaryNum[mid] === "0" &&
          (fullBinaryNum[leftPos] === "1" || fullBinaryNum[rightPos] === "1")
        ) {
          result.push(0);
          possible = false;
          break;
        }
      }
      if (possible) result.push(1);
    }

    return result;
  };
}

console.log(NumToBinaryTree.solution([7, 42, 5]));
console.log(NumToBinaryTree.solution([63, 111, 95]));
console.log(NumToBinaryTree.solution([0]));
