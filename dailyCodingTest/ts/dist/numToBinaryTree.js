"use strict";
var NumToBinaryTree;
(function (NumToBinaryTree) {
    const getMaxLength = (binaryNum) => {
        let digit = 1;
        while (true) {
            if (2 ** (digit - 1) - 1 < binaryNum.length &&
                binaryNum.length <= 2 ** digit - 1) {
                return 2 ** digit - 1;
            }
            digit++;
        }
    };
    const checkPossibleBinaryTree = (fullBinaryNum) => {
        const help = (s, e) => {
            if (s === e)
                return fullBinaryNum[s];
            const root = Math.floor((s + e) / 2);
            if (fullBinaryNum[root] === "0") {
            }
            const leftEnd = root - 1;
            const rightStart = root + 1;
        };
    };
    NumToBinaryTree.solution = (numbers) => {
        const result = [];
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
})(NumToBinaryTree || (NumToBinaryTree = {}));
console.log(NumToBinaryTree.solution([7, 42, 5]));
console.log(NumToBinaryTree.solution([63, 111, 95]));
