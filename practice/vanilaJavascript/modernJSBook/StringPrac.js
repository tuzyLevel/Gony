const str = "     foo      ";

console.log(str.replace("foo", "<strong>$&</strong>"));

console.log(str);

const camelToSnake = (camelCase) => {
  //return camelCase.replace(/[A-Z]/g, "_$&").toLowerCase();

  return camelCase.replace(/.[A-Z]/g, (match) => {
    return match[0] + "_" + match[1].toLowerCase();
  });
};

console.log(camelToSnake("camelCase"));

function snakeToCamel(snakeCase) {
  return snakeCase.replace(/_[a-z]/g, (match) => {
    return match[1].toUpperCase();
  });
}
console.log(snakeToCamel("some_of_this_case"));
