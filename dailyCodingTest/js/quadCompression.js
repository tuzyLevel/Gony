const compression = (arr) => {
  const compResult = [0, 0];
  const func = (rs, re, cs, ce) => {
    const initialValue = arr[rs][cs];

    let canCompression = true;
    for (let r = rs; r <= re; r++) {
      for (let c = cs; c <= ce; c++) {
        if (initialValue !== arr[r][c]) {
          const halfRE = parseInt(re / 2);
          const halfCE = parseInt(ce / 2);
          func(rs, halfRE, cs, halfCE);
          func(rs, halfRE, halfCE + 1, ce);
          func(halfRE + 1, re, cs, halfCE);
          func(halfRE + 1, re, halfCE + 1, ce);
          canCompression = false;

          break;
        }
      }
      if (!canCompression) break;
    }
    if (canCompression) compResult[initialValue]++;
  };
  func(0, arr.length - 1, 0, arr.length - 1);
  return compResult;
};

const solution = (arr) => {
  return compression(arr);
};

console.log(
  solution([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ])
);
