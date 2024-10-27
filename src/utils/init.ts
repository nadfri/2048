const LINES = 4;
const PERCENT_OF_2 = 0.7;

const initialBoard: number[][] = Array.from({ length: LINES }, () =>
  Array(LINES).fill(0),
);

initialBoard[0][0] = 2;
initialBoard[0][1] = 2;
initialBoard[0][2] = 2;
initialBoard[0][3] = 2;
initialBoard[3][0] = 4;

export { initialBoard, LINES, PERCENT_OF_2 };
