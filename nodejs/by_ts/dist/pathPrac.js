"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
//get seperator
console.log(`path.sep : ${path_1.default.sep}`);
//Environment Path Seperator(delimiter)
console.log(`path.delimiter ${path_1.default.delimiter}`);
console.log("-".repeat(10));
//Path of Directory
console.log(`path.dirname() : ${path_1.default.dirname(__filename)}`);
//File Name
console.log(`path.basename() : ${path_1.default.basename(__filename)}`);
//Extension Name
console.log(`path.extname() : ${path_1.default.extname(__filename)}`);
//
console.log(`path.basename() - path.extname(): ${path_1.default.basename(__filename, path_1.default.extname(__filename))}`);
console.log(`path.format() : ${path_1.default.format({
    dir: "/User/park/Programming",
    name: "path",
    ext: ".js",
})}`);
const combination = (arr, selectNumber) => {
    const result = [];
    if (selectNumber === 1) {
        return arr.map((element) => [element]);
    }
    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinationAfterFixed = combination(rest, selectNumber - 1);
        const attached = combinationAfterFixed.map((c) => [fixed, ...c]);
        result.push(...attached);
    });
    return result;
};
console.log(combination([1, 2, 3, 4, 5], 2));
console.log(combination([1, 2, 3, 4, 5], 1));
//Permutation
const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        }
        else {
            arr.forEach((element, index, origin) => {
                let curr = origin.slice();
                let next = origin.splice(index, 1);
                permute(curr.slice(), m.concat(next));
            });
        }
    };
    permute(inputArr);
    return result;
};
console.log(permutator([1, 2, 3, 4]));
