const target = "https://example.com";
const target2 = "http://example.com";
const target3 = "http://example.com/index.html";
const target4 = "http://example.com/index.htm";
const target5 = "http://example.com/index.ht";
const target6 = "12345";
const target7 = " sdjfjdkjf";
const target8 = "abc123";
const target9 = "ungmo2@gmail.com";
const target10 = "010-0000-0000";
const target11 = "1234#dafs";
const target12 = "12341kjdfad";

const regExp = new RegExp("^https?://");
const regExp2 = new RegExp(".html?$");
const regExp3 = new RegExp("^[0-9]+$");

const regExp4 = new RegExp("^[\\s]+");
const regExp5 = new RegExp("^[\\w]{4,10}$");
const regExp6 = new RegExp(
  "^[\\w]([-_.]?[\\w])*@[\\w]([-_.]?[\\w]*).[a-zA-Z]{2,3}$"
);

const regExp7 = new RegExp("^[\\d]{3}-[\\d]{4}-[\\d]{4}$");
const regExp8 = new RegExp("[^\\w]", "gi");

console.log(regExp.test(target));
console.log(regExp.test(target2));
console.log(regExp2.test(target3));
console.log(regExp2.test(target4));
console.log(regExp2.test(target5));

console.log(regExp3.test(target6));
console.log(regExp4.test(target7));
console.log(regExp5.test(target8));
console.log(regExp6.test(target9));
console.log(regExp7.test(target10));
console.log(regExp8.test(target11));
console.log(regExp8.test(target12));
console.log(target11.match(regExp8));
console.log(target12.match(regExp8));
