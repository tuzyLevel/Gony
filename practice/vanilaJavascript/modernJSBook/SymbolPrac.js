const mySymbol = Symbol("This is the description");

console.log(typeof mySymbol);
console.log(mySymbol.description);

const s1 = Symbol.for("mySymbol");
const s2 = Symbol.for("mySymbol");

console.log(s1 === s2);

console.log(Symbol.keyFor(s1));

const iterable = {
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) {
  console.log(num);
}

console.log([Symbol.iterator]());
