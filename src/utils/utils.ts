import { TileType } from '@/components/Tile/Tile';
import { LINES, PERCENT_OF_2 } from './init';

export type Direction = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

function mergeLineValues(line: TileType[]): TileType[] {
  const deepCopyLine = line.map((tile) => ({ ...tile }));

  for (let i = deepCopyLine.length - 1; i > 0; i--) {
    if (deepCopyLine[i].value === deepCopyLine[i - 1].value) {
      deepCopyLine[i - 1].value *= 2;
      deepCopyLine[i - 1].isMerged = true;
      deepCopyLine[i].value = 0;
      i--;
    }
  }

  const mergedWithoutZero = deepCopyLine.filter(
    (tile: TileType) => tile.value !== 0,
  );

  return mergedWithoutZero;
}

export function slideLine(line: TileType[], direction: Direction): TileType[] {
  const valuesWithoutZero = line.filter((tile) => tile.value !== 0);

  if (valuesWithoutZero.length === 0) return line;

  const withDirection = addSlideDirectionToLine(valuesWithoutZero, direction);

  if (direction === 'ArrowLeft' || direction === 'ArrowUp')
    withDirection.reverse();

  const mergedLine = mergeLineValues(withDirection);

  const zeros = Array(LINES - mergedLine.length).fill({
    value: 0,
    isNew: false,
    isMerged: false,
    direction: null,
  });

  const newLine = [...zeros, ...mergedLine];

  if (direction === 'ArrowLeft' || direction === 'ArrowUp') newLine.reverse();

  return newLine;
}

const hasZero = (array: TileType[][]): boolean =>
  JSON.stringify(array).includes('"value":0');

function getZerosIndexes(array: TileType[][]): number[][] {
  const indexes: number[][] = [];

  array.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile.value === 0) indexes.push([rowIndex, columnIndex]);
    });
  });

  return indexes;
}

export const addNewNumberToBoard = (board: TileType[][]): TileType[][] => {
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
};

export function resetTileStates(board: TileType[][]): TileType[][] {
  return board.map((row) =>
    row.map((tile) => ({
      ...tile,
      isNew: false,
      isMerged: false,
      direction: null,
    })),
  );
}

export function addSlideDirectionToLine(
  line: TileType[],
  direction: Direction,
): TileType[] {
  return line.map((tile) => ({
    ...tile,
    direction: tile.value && !tile.isMerged ? direction : null,
  }));
}

export const transposeArray = <T>(array: T[][]): T[][] => {
  if (array.length === 0) return [];
  return array[0].map((_, index) => array.map((row) => row[index]));
};

/*transposeArray
const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

Output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
*/
