"use strict";
function capitalizeFirst(strings) {
    let capitalized = [];
    if (strings.length === 0 || strings === undefined)
        return capitalized;
    capitalized.push(strings[0].substring(0, 1).toUpperCase() + strings[0].substring(1));
    capitalized = capitalized.concat(capitalizeFirst(strings.slice(1)));
    return capitalized;
}
console.log(capitalizeFirst(["monkey", "apple", "banana"]));
