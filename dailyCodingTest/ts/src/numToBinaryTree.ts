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
      const root = Math.floor(maxLength / 2);
      // const root = root - zeroPaddingLength;

      const fullBinaryNum = "0".repeat(zeroPaddingLength) + binaryNum;

      //   result.push(+binaryNum[root - (maxLength - binaryNum.length)]);
    }

    return result;
  };
}

console.log(NumToBinaryTree.solution([7, 42, 5]));
console.log(NumToBinaryTree.solution([63, 111, 95]));
