import { LINES, PERCENT_OF_2 } from './init';

export type Direction = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

function mergeLineValues(line: number[]): number[] {
  const newLine = [...line];
  for (let i = newLine.length - 1; i > 0; i--) {
    if (newLine[i] === newLine[i - 1]) {
      newLine[i - 1] *= 2;
      newLine[i] = 0;
      continue;
    }
  }

  const nonZeroValues = newLine.filter((value) => value !== 0);

  return nonZeroValues;
}

export const slideLine = (line: number[], direction: Direction): number[] => {
  const nonZeroValues = line.filter((value) => value !== 0);

  if (nonZeroValues.length === 0) return line;

  if (direction === 'ArrowLeft' || direction === 'ArrowUp')
    nonZeroValues.reverse();

  const mergedLine = mergeLineValues(nonZeroValues);

  const zeros = Array(LINES - mergedLine.length).fill(0);

  const newLine = [...zeros, ...mergedLine];

  console.log('newLine', newLine);

  if (direction === 'ArrowLeft' || direction === 'ArrowUp') newLine.reverse();

  console.log('newLine', newLine);

  return newLine;
};

const hasZero = (array: number[][]): boolean =>
  JSON.stringify(array).includes('0');

function getZerosIndexes(array: number[][]): number[][] {
  const indexes: number[][] = [];

  array.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0) indexes.push([rowIndex, columnIndex]);
    });
  });

  return indexes;
}

export const addNewNumberToBoard = (board: number[][]): number[][] => {
  if (!hasZero) return board;

  const newBoard = board.map((row: number[]) => [...row]);

  const zerosIndexes = getZerosIndexes(newBoard);

  const randomIndex = Math.floor(Math.random() * zerosIndexes.length);

  const [rowIndex, columnIndex] = zerosIndexes[randomIndex];

  newBoard[rowIndex][columnIndex] = Math.random() < PERCENT_OF_2 ? 2 : 4;

  return newBoard;
};

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
