import { initialBoard } from '@/utils/init';
import { useState, useCallback, useEffect } from 'react';
import {
  transposeArray,
  slideLine,
  addNewNumberToBoard,
  resetTileStates,
  directions,
} from '@/utils/utils';
import { Directions } from '@/types/types';

export function useBoard() {
  const [board, setBoard] = useState(initialBoard);

  const reset = () => setBoard(initialBoard);

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      const direction = event.key as Directions;

      if (!directions.includes(direction)) return;

      const isVerticalMove =
        direction === 'ArrowDown' || direction === 'ArrowUp';

      const orientedBoard = isVerticalMove ? transposeArray(board) : board;

      const resetBoard = resetTileStates(orientedBoard);

      const updatedBoard = resetBoard.map((line) => slideLine(line, direction));

      const isBoardChanged = orientedBoard.some((row, i) =>
        row.some((tile, j) => tile.value !== updatedBoard[i][j].value),
      );

      if (!isBoardChanged) return;

      const boardWithNewNumber = addNewNumberToBoard(updatedBoard);

      setBoard(
        isVerticalMove
          ? transposeArray(boardWithNewNumber)
          : boardWithNewNumber,
      );
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
