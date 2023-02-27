"use strict";
var Move110;
(function (Move110) {
    function move110(binaryString) {
        let targetString = binaryString;
        let cursorOf110 = 0;
        while (cursorOf110 < targetString.length) {
            const indexOf110 = targetString.indexOf("110", cursorOf110);
            if (indexOf110 === -1 || cursorOf110 >= targetString.length)
                break;
            const leftPart = targetString.substring(0, indexOf110);
            const rightPart = targetString.substring(indexOf110 + 3);
            const except110String = leftPart + rightPart;
            let cursor = 0;
            while (cursor < except110String.length) {
                const indexOfZero = except110String.indexOf("0", cursor);
                if (indexOfZero - cursor >= 2 || indexOfZero === -1)
                    break;
                cursor = indexOfZero + 1;
            }
            targetString =
                except110String.substring(0, cursor) +
                    "110" +
                    except110String.substring(cursor);
            cursorOf110 = indexOf110 + 1;
        }
        return targetString;
    }
    Move110.move110 = move110;
    function solution(s) {
        const result = [];
        for (const binaryString of s) {
            result.push(move110(binaryString));
        }
        return result;
    }
    Move110.solution = solution;
})(Move110 || (Move110 = {}));
console.log(Move110.solution(["1110", "100111100", "0111111010"]));
