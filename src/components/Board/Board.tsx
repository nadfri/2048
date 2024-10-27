import './Board.scss';
import { useCallback, useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import { transposeArray } from '@/utils/utils';

const ROWS = 4;
const COLS = 4;

const initialBoard: number[][] = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(0),
);

initialBoard[0][0] = 2;
initialBoard[0][2] = 4;
initialBoard[3][1] = 8;

export default function Board() {
  const [board, setBoard] = useState(initialBoard);

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        const updatedBoard = board.map((row) => {
          const nonZeroValues = row.filter((value) => value !== 0);
          const zeros = Array(COLS - nonZeroValues.length).fill(0);
          return [...zeros, ...nonZeroValues];
        });
        setBoard(updatedBoard);
      }

      if (event.key === 'ArrowLeft') {
        const updatedBoard = board.map((row) => {
          const nonZeroValues = row.filter((value) => value !== 0);
          const zeros = Array(COLS - nonZeroValues.length).fill(0);
          return [...nonZeroValues, ...zeros];
        });
        setBoard(updatedBoard);
      }

      if (event.key === 'ArrowDown') {
        const transposedBoard = transposeArray(board);
        const updatedTransposed = transposedBoard.map((column) => {
          const nonZeroValues = column.filter((value) => value !== 0);
          const zeros = Array(COLS - nonZeroValues.length).fill(0);
          return [...zeros, ...nonZeroValues];
        });
        setBoard(transposeArray(updatedTransposed));
      }

      if (event.key === 'ArrowUp') {
        const transposedBoard = transposeArray(board);
        const updatedTransposed = transposedBoard.map((column) => {
          const nonZeroValues = column.filter((value) => value !== 0);
          const zeros = Array(ROWS - nonZeroValues.length).fill(0);
          return [...nonZeroValues, ...zeros];
        });
        setBoard(transposeArray(updatedTransposed));
      }
    },
    [board],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleMove);

    return () => window.removeEventListener('keydown', handleMove);
  }, [handleMove]);

  return (
    <div
      className="Board"
      style={{ gridTemplateColumns: `repeat(${COLS},1fr` }}
    >
      {board.flat().map((value: number, position: number) => (
        <Tile key={position} value={value} />
      ))}
    </div>
  );
}
