"use strict";
const naiveStringSearch = (str, target) => {
    let result = 0;
    if (str.length < target.length)
        return result;
    for (let i = 0; i < str.length; i++) {
        let isSubString = true;
        for (let j = 0; j < target.length; j++) {
            if (target[j] !== str[i + j]) {
                isSubString = false;
                break;
            }
        }
        if (isSubString)
            result++;
    }
    return result;
};
console.log(naiveStringSearch("asdfijsdifjf", "dfi"));
