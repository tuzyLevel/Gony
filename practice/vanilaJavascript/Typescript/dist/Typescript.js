"use strict";
Set.prototype.union = function (set) {
    const result = new Set(this);
    for (const value of set) {
        result.add(value);
    }
    return result;
};
Set.prototype.diffrence = function (set) {
    // const result = new Set<T>(this);
    // for (const value of this) {
    //   if (set.has(value)) {
    //     result.delete(value);
    //   }
    // }
    // return result;
    //Another way --------------
    return new Set([...this].filter((v) => !set.has(v)));
};
const set = new Set(new Set([1, 2, 3, 4, 5]));
console.log(set.union(new Set([2, 3, 4, 5])));
console.log(set);
console.log(set.diffrence(new Set([3])));
Set.prototype.isSuperset = function (subset) {
    if (subset.size > this.size)
        return false;
    for (const value of subset) {
        if (!this.has(value))
            return false;
    }
    return true;
};
console.log(new Set([1, 2, 3]).isSuperset(new Set([1, 2, 5, 4, 3])));
//Map Object
const map = new Map();
map.set("key1", 1).set(2, 2);
console.log(map);
console.log(map.get(2));
console.log(map.get("key1"));
console.log(map.has(2));
console.log(map.has("key1"));
console.log(map.delete(2));
console.log(map.delete("key1"));
console.log(map);
