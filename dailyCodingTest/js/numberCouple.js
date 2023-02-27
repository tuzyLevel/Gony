const counting = (X) => {
  const objX = {};
  for (const c of X) {
    objX[c] = (objX[c] || 0) + 1;
  }
  return objX;
};

const solution = (X, Y) => {
  const objX = counting(X);
  const objY = counting(Y);
  let arr = [];
  for (const char in objX) {
    if (objY[char]) {
      if (objY[char] < objX[char]) arr.push([char, objY[char]]);
      else arr.push([char, objX[char]]);
    }
  }

  let resultArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < arr[i][1]; j++) {
      resultArr.push(arr[i][0]);
    }
  }
  resultArr.sort((x, y) => y - x);
  console.log(resultArr);
  if (resultArr.length === 0) {
    return "-1";
  } else if (resultArr[0] === "0") {
    return "0";
  }
  return resultArr.join("");
};
console.log(solution("100", "203045"));
