namespace Wallpaper {
  export const solution = (wallpaper: string[]) => {
    const lu: [number, number] = [Infinity, Infinity];
    const rd: [number, number] = [-1, -1];

    for (let i = 0; i < wallpaper.length; i++) {
      for (let j = 0; j < wallpaper[i].length; j++) {
        if (wallpaper[i][j] === "#") {
          if (i < lu[0]) lu[0] = i;
          if (j < lu[1]) lu[1] = j;
          if (i >= rd[0]) rd[0] = i + 1;
          if (j >= rd[1]) rd[1] = j + 1;
        }
      }
    }
    return [...lu, ...rd];
  };
}

console.log(Wallpaper.solution([".#...", "..#..", "...#."]));
console.log(
  Wallpaper.solution([
    "..........",
    ".....#....",
    "......##..",
    "...##.....",
    "....#.....",
  ])
);
