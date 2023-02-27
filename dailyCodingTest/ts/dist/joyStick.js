"use strict";
const closeMoveCountFromA = (char) => {
    // for Uppercase letters, replace `a` with `A`
    const code = "A".charCodeAt(0);
    const targetCode = char.charCodeAt(0);
    const alphabetCount = "Z".charCodeAt(0) - code + 1;
    return targetCode - code <= alphabetCount / 2
        ? targetCode - code
        : code + alphabetCount - targetCode;
};
var Direction;
(function (Direction) {
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Left"] = -1] = "Left";
})(Direction || (Direction = {}));
const getDirectionNEndPoint = (name) => {
    let rightEmptyLength = 0;
    let leftEmptyLength = 0;
    for (let i = 1; i < name.length / 2; i++) {
        if (name[name.length - i] === "A")
            leftEmptyLength++;
        if (name[i] === "A")
            rightEmptyLength++;
        if (rightEmptyLength !== leftEmptyLength)
            return rightEmptyLength > leftEmptyLength
                ? Direction.Left
                : Direction.Right;
    }
    return Direction.Right;
};
const changeName = (name) => {
    let count = 0;
    const direction = getDirectionNEndPoint(name);
    let index = 0;
    count += closeMoveCountFromA(name[index]);
    count += 1;
    index =
        (index + direction) % name.length < 0
            ? ((index + direction) % name.length) + name.length
            : (index + direction) % name.length;
    while (index !== 0) {
        console.log(closeMoveCountFromA(name[index]));
        count += closeMoveCountFromA(name[index]);
        count += 1;
        index =
            (index + direction) % name.length < 0
                ? ((index + direction) % name.length) + name.length
                : (index + direction) % name.length;
    }
    // if (direction === Direction.Right) {
    //   for (let i = 0; i < name.length; i++) {
    //     count += closeMoveCountFromA(name[i]); //위아래
    //     count += 1; //좌우
    //   }
    // } else {
    //   count += closeMoveCountFromA(name[0]);
    //   count += 1;
    //   for (let i = name.length - 1; i > 0; i--) {
    //     count += closeMoveCountFromA(name[i]); //위아래
    //     count += 1; //좌우
    //   }
    // }
    return count;
};
const _2 = (name) => {
    return changeName(name);
};
console.log(_2("JAN"));
