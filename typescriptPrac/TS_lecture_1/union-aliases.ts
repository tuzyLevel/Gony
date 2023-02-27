type Combinable = number | string;
type ConversionDescryptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescryptor
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number")
    result = input1 + input2;
  else result = input1.toString() + input2.toString();
  if (resultConversion === "as-number") {
    return +result;
  } else {
    return result;
  }
}

console.log(combine(30, 52, "as-number"));
