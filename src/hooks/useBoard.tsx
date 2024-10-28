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
  const [prevBoard, setPrevBoard] = useState(initialBoard);
  const [canBack, setCanBack] = useState(false);

  const reset = () => setBoard(initialBoard);
  const backPrevBoard = () => {
    setBoard(prevBoard);
    setCanBack(false);
  };

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      const direction = event.key as Directions;

      if (!directions.includes(direction)) return;

      const isVerticalMove =
        direction === 'ArrowDown' || direction === 'ArrowUp';

      /***#1 Reset the tile states***/
      const newBoard = resetTileStates(board);

      /***#2 Change Orientation for Vertical move**/
      const orientedBoard = isVerticalMove
        ? transposeArray(newBoard)
        : newBoard;

      /***#3 Update Board after slide move***/
      const updatedBoard = orientedBoard.map((line) =>
        slideLine(line, direction),
      );

      const isBoardChanged = orientedBoard.some((row, i) =>
        row.some((tile, j) => tile.value !== updatedBoard[i][j].value),
      );

      if (!isBoardChanged) return;

      /***#4 Add new number to the board if has changed***/
      const boardWithNewNumber = addNewNumberToBoard(updatedBoard);

      setBoard(
        isVerticalMove
          ? transposeArray(boardWithNewNumber)
          : boardWithNewNumber,
      );

      setPrevBoard(board);
      setCanBack(true);
    },
    [board],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleMove);

    /*CleanUp*/
    return () => window.removeEventListener('keydown', handleMove);
  }, [handleMove]);

  return { board, reset, backPrevBoard, canBack };
}
