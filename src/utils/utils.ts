export const transposeArray = <T>(arr: T[][]): T[][] => {
  if (arr.length === 0) return [];
  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
};
