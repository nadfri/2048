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

initialBoard[1][0] = {
  value: 2,
  isNew: false,
  isMerged: false,
  direction: null,
};
initialBoard[1][1] = {
  value: 2,
  isNew: false,
  isMerged: false,
  direction: null,
};

export { initialBoard, LINES, PERCENT_OF_2 };
