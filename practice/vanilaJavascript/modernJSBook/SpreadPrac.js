const arr = [1, 2, 3];

const max = Math.max(...arr);
console.log(max);

function foo(...rest) {
  console.log(rest);
}

foo(1, 2, 3, 4);
console.log([1, 2].concat([3, 4]));
console.log([...[1, 2], ...[3, 4]]);

let arr1 = [1, 4];
let arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1);

const origin = [1, 2];
const copy = [...origin];

console.log(copy);
console.log(origin === copy);

function sum() {
  let args = Array.prototype.slice.call(arguments);

  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3, 4));

function sum2() {
  let args = [...arguments];
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum2(1, 2, 3, 4));

const arrayLike = {
  0: "0-",
  1: "1-",
  2: "2-",
  length: 3,
};

console.log(Array.from(arrayLike));

let arr12 = [1, 2, 3];
let [one, two, three] = arr12;

console.log(arr12);

function parseURL(url = "") {
  const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);

  console.log(parsedURL);

  const [, protocol, host, path] = parsedURL;
  return { protocol, host, path };
}

const parsedURL = parseURL("https://188.198.0.2/transmission/web/");

console.log(parsedURL);
