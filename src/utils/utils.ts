import { LINES } from './init';

export type Direction = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

export const slideLine = (line: number[], direction: Direction) => {
  const nonZeroValues = line.filter((value) => value !== 0);

  const zeros = Array(LINES - nonZeroValues.length).fill(0);

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
