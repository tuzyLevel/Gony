const loadByOrder = (order) => {
  let result = 0;
  const subBelt = [];
  let orderIndex = 0;

  for (let i = 1; i <= order.length; i++) {
    if (i !== order[orderIndex]) {
      subBelt.push(i);
    } else {
      orderIndex++;
      result++;
    }
    while (subBelt && orderIndex < order.length) {
      if (subBelt[subBelt.length - 1] === order[orderIndex]) {
        subBelt.pop();
        orderIndex++;
        result++;
      } else break;
    }
  }
  return result;
};

const solution = (order) => {
  return loadByOrder(order);
};

console.log(solution([4, 3, 1, 2, 5]));
console.log(solution([5, 4, 3, 2, 1]));
