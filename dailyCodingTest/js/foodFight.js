const configure = (food) => {
  const result = [];
  for (let i = 1; i < food.length; i++) {
    for (let j = 0; j < parseInt(food[i] / 2); j++) {
      result.push(i);
    }
  }
  return [...result, 0, ...result.reverse()].join("");
};
const solution = (food) => {
  return configure(food);
};

console.log(solution([1, 3, 4, 6]));
