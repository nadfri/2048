import { useState, useCallback, useEffect } from 'react';
import { Direction, transposeArray, slideLine } from '@/utils/utils';
import { initialBoard } from '@/utils/init';

export function useBoard() {
  const [board, setBoard] = useState(initialBoard);

  const reset = () => setBoard(initialBoard);

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      const direction = event.key as Direction;

      const isVerticalMove =
        direction === 'ArrowDown' || direction === 'ArrowUp';

      const orientedBoard = isVerticalMove ? transposeArray(board) : board;

      const updatedBoard = orientedBoard.map((line) =>
        slideLine(line, direction),
      );

      setBoard(isVerticalMove ? transposeArray(updatedBoard) : updatedBoard);
    },
    [board],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleMove);

    /*CleanUp*/
    return () => window.removeEventListener('keydown', handleMove);
  }, [handleMove]);

  return { board, reset };
}
