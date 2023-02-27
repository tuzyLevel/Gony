const canSpeakWordsCounts = (babbling) => {
  const canSpeakWords = ["aya", "ye", "woo", "ma"];
  let count = 0;
  for (const word of babbling) {
    let testWord = word.slice();
    for (const [index, csw] of Object.entries(canSpeakWords)) {
      testWord = testWord.replaceAll(csw, `${index}`);
    }
    if (!Number.isNaN(+testWord)) {
      let canSpeak = true;
      for (let i = 0; i < testWord.length - 1; i++) {
        if (testWord[i] === testWord[i + 1]) {
          canSpeak = false;
          break;
        }
      }
      if (canSpeak) count++;
    }
  }
  return count;
};

const solution = (babbling) => {
  return canSpeakWordsCounts(babbling);
};

console.log(solution(["aya", "yee", "u", "maa"]));
console.log(solution(["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]));
