const LINES = 4;

const initialBoard: number[][] = Array.from({ length: LINES }, () =>
  Array(LINES).fill(0),
);

initialBoard[0][0] = 2;
initialBoard[0][2] = 2;
initialBoard[0][3] = 4;
initialBoard[3][1] = 8;

export { initialBoard, LINES };
