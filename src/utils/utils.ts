import { LINES, PERCENT_OF_2 } from './init';
import { Directions, TileType } from '@/types/types';

export const directions: Directions[] = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
];

type SlideLineResult = {
  newLine: TileType[];
  scoreGained: number;
};

export function slideLine(
  line: TileType[],
  direction: Directions,
): SlideLineResult {
  /*#1 Remove zeros from the line*/
  const valuesWithoutZero = line.filter((tile) => tile.value !== 0);
  if (valuesWithoutZero.length === 0) return { newLine: line, scoreGained: 0 };

  /*#2 Orient the line */
  let isReversed = false;
  if (direction === 'ArrowLeft' || direction === 'ArrowUp') {
    valuesWithoutZero.reverse();
    isReversed = true;
  }

  /*#3 Merge tiles of the line */
  const mergeResult = mergeLineValues(valuesWithoutZero);
  const { mergedLine, scoreGained } = mergeResult;

  /*#4 Add zeros to the line */
  const zeros: TileType[] = Array(LINES - mergedLine.length).fill({
    value: 0,
    isNew: false,
    isMerged: false,
    direction: null,
  });

  let newLine: TileType[] = isReversed
    ? [...mergedLine, ...zeros]
    : [...zeros, ...mergedLine];

  const isLineChanged = line.some(
    (tile, index) => tile.value !== newLine[index].value,
  );

  if (!isLineChanged) return { newLine: line, scoreGained: 0 };

  newLine = addSlideDirectionToLine(newLine, line, direction);

  return { newLine, scoreGained };
}

type MergeLineResult = {
  mergedLine: TileType[];
  scoreGained: number;
};

function mergeLineValues(line: TileType[]): MergeLineResult {
  if (line.length < 2) return { mergedLine: line, scoreGained: 0 };

  const deepCopyLine = line.map((tile) => ({ ...tile }));
  let scoreGained = 0;

  for (let i = deepCopyLine.length - 1; i > 0; i--) {
    if (
      deepCopyLine[i].value === deepCopyLine[i - 1].value &&
      deepCopyLine[i].value !== 0
    ) {
      deepCopyLine[i - 1].value *= 2;
      deepCopyLine[i - 1].isMerged = true;
      scoreGained += deepCopyLine[i - 1].value;

      deepCopyLine[i] = {
        value: 0,
        isNew: false,
        isMerged: false,
        direction: null,
      };
      i--;
    }
  }

  const mergedLine = deepCopyLine.filter((tile) => tile.value !== 0);

  return { mergedLine, scoreGained };
}

export function addSlideDirectionToLine(
  newLine: TileType[],
  originalLine: TileType[],
  direction: Directions,
): TileType[] {
  return newLine.map((tile, index) => {
    if (tile.value && tile.value !== originalLine[index].value) {
      return { ...tile, direction };
    }
    return tile;
  });
}

function getZerosIndexes(array: TileType[][]): number[][] {
  const indexes: number[][] = [];

  array.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile.value === 0) indexes.push([rowIndex, columnIndex]);
    });
  });

  return indexes;
}

export function addNewNumberToBoard(board: TileType[][]): TileType[][] {
  if (!hasZero(board)) return board;

  const deepCopyBoard = board.map((line) => line.map((tile) => ({ ...tile })));

  const zerosIndexes = getZerosIndexes(deepCopyBoard);

  if (zerosIndexes.length === 0) return board;

  const randomIndex = Math.floor(Math.random() * zerosIndexes.length);

  const [rowIndex, columnIndex] = zerosIndexes[randomIndex];

  deepCopyBoard[rowIndex][columnIndex].value =
    Math.random() < PERCENT_OF_2 ? 2 : 4;

  deepCopyBoard[rowIndex][columnIndex].isNew = true;
  deepCopyBoard[rowIndex][columnIndex].direction = null;

  return deepCopyBoard;
}

export function resetTileStates(board: TileType[][]): TileType[][] {
  return board.map((line) =>
    line.map((tile) => ({
      value: tile.value,
      isNew: false,
      isMerged: false,
      direction: null,
    })),
  );
}

export function getMaxValue(board: TileType[][]): number {
  return Math.max(...board.flat().map((tile) => tile.value), 0);
}

const hasZero = (array: TileType[][]): boolean =>
  array.some((row) => row.some((tile) => tile.value === 0));

export const transposeArray = <T>(array: T[][]): T[][] => {
  if (array.length === 0) return [];
  return array[0].map((_, index) => array.map((row) => ({ ...row[index] })));
};

/* transposeArray
const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

Output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
*/
