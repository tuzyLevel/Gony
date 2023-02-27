const makeHamburger = (ingredients) => {
  const stack = [];
  let result = 0;
  for (const ingredient of ingredients) {
    const len = stack.length;
    if (
      len >= 3 &&
      stack[len - 1] === 3 &&
      stack[len - 2] === 2 &&
      stack[len - 3] === 1 &&
      ingredient === 1
    ) {
      for (let i = 0; i < 3; i++) {
        stack.pop();
      }
      result++;
    } else {
      stack.push(ingredient);
    }
  }

  return result;
};

const solution = (ingredients) => {
  return makeHamburger(ingredients);
};

console.log(solution([2, 1, 1, 2, 3, 1, 2, 3, 1]));
