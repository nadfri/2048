import { LINES, PERCENT_OF_2 } from './init';
import { Directions, TileType } from '@/types/types';

export const directions: Directions[] = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
];

export function slideLine(line: TileType[], direction: Directions): TileType[] {
  const originalLine = line.map((tile) => ({ ...tile }));
  const valuesWithoutZero = line.filter((tile) => tile.value !== 0);

  if (valuesWithoutZero.length === 0) return line;

  if (direction === 'ArrowLeft' || direction === 'ArrowUp')
    valuesWithoutZero.reverse();

  const mergedLine = mergeLineValues(valuesWithoutZero);

  const zeros = Array(LINES - mergedLine.length).fill({
    value: 0,
    isNew: false,
    isMerged: false,
    direction: null,
  });

  const newLine = [...zeros, ...mergedLine];

  if (direction === 'ArrowLeft' || direction === 'ArrowUp') newLine.reverse();

  const isLineChanged = originalLine.some(
    (tile, index) => tile.value !== newLine[index].value,
  );

  if (!isLineChanged) return originalLine;

  const newLineWithDirection = addSlideDirectionToLine(
    newLine,
    originalLine,
    direction,
  );

  return newLineWithDirection;
}

function mergeLineValues(line: TileType[]): TileType[] {
  const deepCopyLine = line.map((tile) => ({ ...tile }));

  for (let i = deepCopyLine.length - 1; i > 0; i--) {
    if (deepCopyLine[i].value === deepCopyLine[i - 1].value) {
      deepCopyLine[i - 1].value *= 2;
      deepCopyLine[i - 1].isMerged = true;
      deepCopyLine[i] = {
        value: 0,
        isNew: false,
        isMerged: false,
        direction: null,
      };

      i--;
    }
  }

  const mergedWithoutZero = deepCopyLine.filter(
    (tile: TileType) => tile.value !== 0,
  );

  return mergedWithoutZero;
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
  if (!hasZero) return board;

  const deepCopyBoard = board.map((line) => line.map((tile) => ({ ...tile })));

  const zerosIndexes = getZerosIndexes(deepCopyBoard);

  if (zerosIndexes.length === 0) return board;

  const randomIndex = Math.floor(Math.random() * zerosIndexes.length);

  const [rowIndex, columnIndex] = zerosIndexes[randomIndex];

  deepCopyBoard[rowIndex][columnIndex].value =
    Math.random() < PERCENT_OF_2 ? 2 : 4;

  deepCopyBoard[rowIndex][columnIndex].isNew = true;

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

export function addSlideDirectionToLine(
  line: TileType[],
  originalLine: TileType[],
  direction: Directions,
): TileType[] {
  const deepCopyLine = line.map((tile) => ({ ...tile }));

  return deepCopyLine.map((tile, index) => {
    if (tile.value && tile.value !== originalLine[index].value) {
      return { ...tile, direction };
    }
    return tile;
  });
}

const hasZero = (array: TileType[][]): boolean =>
  JSON.stringify(array).includes('"value":0');

export const transposeArray = <T>(array: T[][]): T[][] => {
  if (array.length === 0) return [];
  return array[0].map((_, index) => array.map((row) => ({ ...row[index] })));
};

/*transposeArray
const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

Output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
*/
