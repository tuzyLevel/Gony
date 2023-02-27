type fruitWindow = {
  [fruit: string]: number;
};

const checkDiscountList = (
  want: string[],
  number: number[],
  window: fruitWindow
) => {
  for (let i = 0; i < want.length; i++) {
    if (number[i] !== window[want[i]]) return false;
  }
  return true;
};

const discountEvent = (
  want: string[],
  number: number[],
  discount: string[]
) => {
  let result = 0;

  let wantAmount = number.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const window: fruitWindow = {};
  //initialize window
  for (let i = 0; i < wantAmount; i++) {
    window[discount[i]] = window[discount[i]] ? window[discount[i]] + 1 : 1;
  }
  result += Number(checkDiscountList(want, number, window));
  //check all element
  for (let i = 1; i <= discount.length - wantAmount; i++) {
    const offset = wantAmount - 1;
    //remove one not in sale distance
    window[discount[i - 1]] -= 1;
    //insert one newly in sale distance
    window[discount[i + offset]] = window[discount[i + offset]]
      ? window[discount[i + offset]] + 1
      : 1;

    result = checkDiscountList(want, number, window) ? result + 1 : result;
  }
  return result;
};

const _ = (want: string[], number: number[], discount: string[]) => {
  return discountEvent(want, number, discount);
};

console.log(
  _(
    ["banana", "apple", "rice", "pork", "pot"],
    [3, 2, 2, 2, 1],
    [
      "chicken",
      "apple",
      "apple",
      "banana",
      "rice",
      "apple",
      "pork",
      "banana",
      "pork",
      "rice",
      "pot",
      "banana",
      "apple",
      "banana",
    ]
  )
);
