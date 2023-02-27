"use strict";
function reverse(str) {
    // add whatever parameters you deem necessary - good luck!
    if (str === "")
        return "";
    return str[str.length - 1] + reverse(str.substring(0, str.length - 1));
}
console.log(reverse("awesome"));
