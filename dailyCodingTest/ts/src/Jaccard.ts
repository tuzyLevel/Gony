namespace Jaccard {
  export const solution = (str1: string, str2: string) => {
    // if (str1.length === 0 && str2.length === 0) return 65536;

    const objA: { [word: string]: number } = {};
    const objB: { [word: string]: number } = {};

    const A = str1.toUpperCase();
    const B = str2.toUpperCase();

    for (let i = 0; i < A.length - 1; i++) {
      if (
        A[i].charCodeAt(0) >= 65 &&
        A[i].charCodeAt(0) <= 90 &&
        A[i + 1].charCodeAt(0) >= 65 &&
        A[i + 1].charCodeAt(0) <= 90
      ) {
        const wordOf2Length = A[i] + A[i + 1];
        objA[wordOf2Length] ? objA[wordOf2Length]++ : (objA[wordOf2Length] = 1);
      }
    }

    for (let i = 0; i < B.length - 1; i++) {
      if (
        B[i].charCodeAt(0) >= 65 &&
        B[i].charCodeAt(0) <= 90 &&
        B[i + 1].charCodeAt(0) >= 65 &&
        B[i + 1].charCodeAt(0) <= 90
      ) {
        const wordOf2Length = B[i] + B[i + 1];
        objB[wordOf2Length] ? objB[wordOf2Length]++ : (objB[wordOf2Length] = 1);
      }
    }

    const keysOfA = Object.keys(objA);
    let intersaction = 0;
    let union = 0;
    for (const key of keysOfA) {
      if (objB[key] && objA[key] < objB[key]) {
        intersaction += objA[key];
        union += objB[key];
        delete objB[key];
      } else if (objB[key] && objA[key] >= objB[key]) {
        intersaction += objB[key];
        union += objA[key];
        delete objB[key];
      } else {
        union += objA[key];
      }
    }
    union += Object.values(objB).reduce((acc, cur) => acc + cur, 0);

    if (union === 0) return 65536;
    return Math.floor((intersaction / union) * 65536);
  };
}

console.log(Jaccard.solution("FRANCE", "french"));
console.log(Jaccard.solution("E=M*C^2", "e=m*c^2"));
console.log(Jaccard.solution("handshake", "shake hands"));
console.log(Jaccard.solution("aa1+aa2", "AAAA12"));
