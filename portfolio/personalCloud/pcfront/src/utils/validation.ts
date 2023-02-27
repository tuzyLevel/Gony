export const validation = (
  type: "directory" | "file" | "user",
  target: string
) => {
  if (type === "directory") {
    const pattern = /^[\w가-힣\[\]\(\)]*$/;
    if (target.match(pattern) === null) return false;
    return target.match(pattern)![0] === target;
  } else if (type === "file") {
    const pattern = /^[\w가-힣\[\]\(\)]*\.[A-Za-z]*$/;
    if (target.match(pattern) === null) return false;
    return target.match(pattern)![0] === target;
  } else if (type === "user") {
    const pattern = /(?=.*\w)(?!.*\W).{6,15}/;
    if (target.match(pattern) === null) return false;
    return target.match(pattern)![0] === target;
  }
};
