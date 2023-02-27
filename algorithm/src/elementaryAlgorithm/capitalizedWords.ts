const capitalizedWords = (strings: string[]): string[] => {
  let result: string[] = [];

  if (strings.length === 0) return result;
  result.push(strings[0].toUpperCase());
  result = result.concat(capitalizedWords(strings.slice(1)));
  return result;
};

console.log(capitalizedWords(["cat", "pat", "fat"]));
