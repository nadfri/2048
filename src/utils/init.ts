import { TileType } from '@/types/types';
import { defaultTile } from './utils';

const LINES = 4;
const PERCENT_OF_2 = 0.7;

function newBoard(): TileType[][] {
  const randomRowIndex = Math.floor(Math.random() * LINES);
  const randomColumnIndex = Math.floor(Math.random() * LINES);

  const initialBoard: TileType[][] = Array.from({ length: LINES }, () =>
    Array(LINES).fill(defaultTile()),
  );

  initialBoard[randomRowIndex][randomColumnIndex] = {
    value: Math.random() < PERCENT_OF_2 ? 2 : 4,
    isNew: true,
    isMerged: false,
    direction: null,
  };

  return initialBoard;
}

export { newBoard, LINES, PERCENT_OF_2 };
