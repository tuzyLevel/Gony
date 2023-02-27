namespace PickUpItem {
  const isOutline = (x: number, y: number, rectangle: number[][]) => {
    for (const [x1, y1, x2, y2] of rectangle) {
      if (x1 < x && x < x2 && y1 < y && y < y2) return false;
    }

    return true;
  };

  const getOutlines = (
    rectangle: number[][]
  ): [
    {
      [x: number]: { [y: number]: boolean };
    },
    number
  ] => {
    const outlines: {
      [x: number]: { [y: number]: boolean };
    } = {};

    for (let i = 1; i <= 50; i++) {
      outlines[i] = {};
    }

    




    let length = 0;
    for (const rect of rectangle) {
      const [x1, y1, x2, y2] = rect;

      for (let y = y1; y <= y2; y++) {
        if (!outlines[x1][y] && isOutline(x1, y, rectangle)) {
          outlines[x1][y] = true;
          length++;
        }
        if (!outlines[x2][y] && isOutline(x2, y, rectangle)) {
          outlines[x2][y] = isOutline(x2, y, rectangle);
          length++;
        }
      }
      for (let x = x1; x <= x2; x++) {
        if (!outlines[x][y1] && isOutline(x, y1, rectangle)) {
          outlines[x][y1] = true;
          length++;
        }
        if (!outlines[x][y2] && isOutline(x, y2, rectangle)) {
          outlines[x][y2] = true;
          length++;
        }
      }
    }

    return [outlines, length];
  };

  export function solution(
    rectangle: number[][],
    characterX: number,
    characterY: number,
    itemX: number,
    itemY: number
  ) {
    let character = {
      curX: characterX,
      curY: characterY,
      offsetX: 0,
      offsetY: 0,
    };

    const direction = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    const [outlines, totalLength] = getOutlines(rectangle);

    let step = 0;
    while (character.curX !== itemX || character.curY !== itemY) {
      for (const dir of direction) {
        if (
          (dir[0] !== character.offsetX || dir[1] !== character.offsetY) &&
          outlines[character.curX + dir[0]] &&
          outlines[character.curX + dir[0]][character.curY + dir[1]]
        ) {
          character.curX = character.curX + dir[0];
          character.curY = character.curY + dir[1];
          character.offsetX = -dir[0];
          character.offsetY = -dir[1];
          step++;
          console.log(character);
          break;
        }
      }
    }
    return totalLength - step < step ? totalLength - step : step;
    return getOutlines(rectangle);
  }
}

// console.log(
//   PickUpItem.solution(
//     [
//       [1, 1, 7, 4],
//       [3, 2, 5, 5],
//       [4, 3, 6, 9],
//       [2, 6, 8, 8],
//     ],
//     1,
//     3,
//     7,
//     8
//   )
// );

console.log(
  PickUpItem.solution(
    [
      [1, 1, 8, 4],
      [2, 2, 4, 9],
      [3, 6, 9, 8],
      [6, 3, 7, 7],
    ],
    9,
    7,
    6,
    1
  )
);
