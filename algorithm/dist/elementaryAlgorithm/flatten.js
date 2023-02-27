"use strict";
function flatten(target) {
    const arr = [];
    function recursive(target) {
        if (typeof target === "number") {
            arr.push(target);
        }
        else if (Array.isArray(target)) {
            for (const t of target) {
                recursive(t);
            }
        }
    }
    recursive(target);
    return arr;
}
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]));
