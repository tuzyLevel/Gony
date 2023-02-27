const rings = (cards) => {
  const resArr = [];
  const visited = [];
  for (let i = 0; i < cards.length; i++) {
    visited[i] = false;
  }
  for (const card of cards) {
    if (!visited[card]) {
      visited[card] = true;
      let ringLength = 1;
      const startCard = card;
      let currentCard = card;
      while (cards[currentCard - 1] !== startCard) {
        ringLength++;
        currentCard = cards[currentCard - 1];
        visited[currentCard] = true;
      }
      resArr.push(ringLength);
    }
  }
  resArr.sort((x, y) => y - x);
  return resArr.length < 2 ? 0 : resArr[0] * resArr[1];
};

function solution(cards) {
  return rings(cards);
}

console.log(solution([8, 6, 3, 7, 2, 5, 1, 4]));
