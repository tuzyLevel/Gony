const toppingObjInitializer = () => {
  const obj = {};
  obj.length = 0;
  return obj;
};

const fairCutting = (topping) => {
  let result = 0;

  const origin = toppingObjInitializer();

  for (const ingredient of topping) {
    if (!origin[ingredient]) {
      origin[ingredient] = 1;
      origin.length++;
    } else {
      origin[ingredient]++;
    }
  }

  const afterCut = toppingObjInitializer();

  let index = 0;

  while (afterCut.length <= origin.length && index < topping.length) {
    origin[topping[index]]--;
    if (origin[topping[index]] === 0) origin.length--;
    if (!afterCut[topping[index]]) {
      afterCut[topping[index]] = 1;
      afterCut.length++;
    } else {
      afterCut[topping[index]]++;
    }
    if (origin.length === afterCut.length) {
      result++;
    }
    index++;
  }

  return result;
};

const solution = (topping) => {
  return fairCutting(topping);
};

console.log(solution([1, 2, 1, 3, 1, 4, 1, 2]));
console.log(solution([1, 2, 3, 1, 4]));
