import { TileType } from '@/types/types';

const LINES = 4;
const PERCENT_OF_2 = 0.7;

const initialBoard: TileType[][] = Array.from({ length: LINES }, () =>
  Array(LINES).fill({
    value: 0,
    isNew: false,
    isMerged: false,
    direction: null,
  }),
);

initialBoard[0][1] = {
  value: 2,
  isNew: false,
  isMerged: false,
  direction: null,
};
initialBoard[0][2] = {
  value: 4,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[0][3] = {
  value: 8,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[1][0] = {
  value: 16,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[1][1] = {
  value: 32,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[1][2] = {
  value: 64,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[1][3] = {
  value: 128,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[2][0] = {
  value: 256,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[2][1] = {
  value: 512,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[2][2] = {
  value: 1024,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[2][3] = {
  value: 2048,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[3][0] = {
  value: 4096,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[3][1] = {
  value: 8192,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[3][2] = {
  value: 16384,
  isNew: false,
  isMerged: false,
  direction: null,
};

initialBoard[3][3] = {
  value: 32768,
  isNew: false,
  isMerged: false,
  direction: null,
};



export { initialBoard, LINES, PERCENT_OF_2 };
