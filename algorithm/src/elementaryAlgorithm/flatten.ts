function flatten(target: recursiveNumberArray): number[] {
  const arr: number[] = [];
  function recursive(target: recursiveNumberArray) {
    if (typeof target === "number") {
      arr.push(target);
    } else if (Array.isArray(target)) {
      for (const t of target) {
        recursive(t);
      }
    }
  }
  recursive(target);
  return arr;
}

type recursiveNumberArray = number | Array<recursiveNumberArray>;

console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]));
