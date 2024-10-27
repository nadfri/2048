import { LINES } from './init';

export type Direction = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

function mergeLineValues(line: number[]): number[] {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i] === line[i + 1]) {
      line[i + 1] *= 2;
      line[i] = 0;
    }
  }

  return line;
}

export const slideLine = (line: number[], direction: Direction) => {
  const nonZeroValues = line.filter((value) => value !== 0);

  if (nonZeroValues.length === 0) return line;

  const mergedLine = mergeLineValues(nonZeroValues);

  const zeros = Array(LINES - mergedLine.length).fill(0);

  return direction === 'ArrowRight' || direction === 'ArrowDown'
    ? [...zeros, ...nonZeroValues]
    : [...nonZeroValues, ...zeros];
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
