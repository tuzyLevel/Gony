interface gameObjectITF {
  currentPos: number[];
  id: number;
  color: number;
  offsets: Array<number[]>;
}

// id: 1 막대
export class gameObject implements gameObjectITF {
  totalTypeCount = 2;
  offsets: Array<number[]> = [];
  constructor(
    public currentPos: number[],
    public id: number,
    public color: number
  ) {
    this.id = Math.floor(Math.random() * this.totalTypeCount);
    const [x, y] = currentPos;
    if (id === 0) {
      //긴 막대
      this.offsets = [
        [0, -1],
        [0, 1],
        [0, +2],
      ];
    } else if (id === 1) {
      this.offsets = [
        //철 모양
        [-1, 0],
        [0, -1],
        [0, 1],
      ];
    } else if (id === 2) {
    } else if (id === 3) {
    }
  }
}
