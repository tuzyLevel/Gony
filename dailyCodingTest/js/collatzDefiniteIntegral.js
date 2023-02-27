const getLinearFunction = (pointA, pointB) => {
  //point = [x, y];
  //coefficient = [tangent, y-intercept]

  const tangent = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
  const linearCoefficient = [tangent, pointA[1] - tangent * pointA[0]];
  return linearCoefficient;
};

const getArea = (coefficient, range) => {
  //start = range[0], end = range[1]
  const tangent = coefficient[0] * (1 / 2);
  const y_intercept = coefficient[1];
  return (
    tangent * (range[1] ** 2 - range[0] ** 2) +
    y_intercept * (range[1] - range[0])
  );
};

const getCollaztArray = (k) => {
  const collaztArray = [];
  while (true) {
    collaztArray.push(k);
    if (k === 1) {
      break;
    }
    if (k % 2 === 0) {
      k = k / 2;
    } else {
      k = k * 3 + 1;
    }
  }
  return collaztArray;
};

const solution = (k, ranges) => {
  const collaztArray = getCollaztArray(k);
  const result = [];
  //sP : startPoint, ep: endPoint
  const eP = collaztArray.length - 1;

  for (const range of ranges) {
    if (range[0] === eP + range[1]) {
      result.push(0.0);
    } else if (range[0] > eP + range[1]) {
      result.push(-1.0);
    } else {
      let areaSum = 0;
      for (let i = range[0]; i < eP + range[1]; i++) {
        const linearCoefficient = getLinearFunction(
          [i, collaztArray[i]],
          [i + 1, collaztArray[i + 1]]
        );
        areaSum += getArea(linearCoefficient, [i, i + 1]);
      }
      result.push(areaSum);
    }
  }

  return result;
};

console.log(
  solution(5, [
    [0, 0],
    [0, -1],
    [2, -3],
    [3, -3],
  ])
);
