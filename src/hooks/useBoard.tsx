import { newBoard } from '@/utils/init';
import { useState, useCallback, useEffect } from 'react';
import {
  transposeArray,
  slideLine,
  addNewNumberToBoard,
  resetTileStates,
  directions,
  getMaxValue,
} from '@/utils/utils';
import { Directions, TileType } from '@/types/types';
import { getFromStorage, saveInStorage } from '@/utils/storage';

export function useBoard() {
  const dataStorage = getFromStorage();

  const [board, setBoard] = useState<TileType[][]>(
    dataStorage?.board || newBoard(),
  );
  const [prevBoard, setPrevBoard] = useState<TileType[][] | null>(null);
  const [canBack, setCanBack] = useState(false);
  const [score, setScore] = useState<number>(dataStorage?.score || 0);
  const [prevScore, setPrevScore] = useState<number>(dataStorage?.score || 0);
  const [highScore, setHighScore] = useState<number>(
    dataStorage?.highScore || 0,
  );
  const [maxValue, setMaxValue] = useState<number>(dataStorage?.maxValue || 0);

  const reload = () => {
    const newInitialBoard = newBoard();
    setBoard(newInitialBoard);
    setScore(0);
    setMaxValue(0);
    setCanBack(false);
    saveInStorage({ board: newInitialBoard, score: 0, highScore, maxValue: 0 });
  };

  const backPrevBoard = () => {
    if (prevBoard) {
      setBoard(prevBoard);
      setScore(prevScore);
      setCanBack(false);
      setMaxValue(getMaxValue(prevBoard));
      saveInStorage({
        board: prevBoard,
        score: prevScore,
        highScore,
        maxValue,
      });
    }
  };

  const handleMove = useCallback(
    (direction: Directions) => {
      if (!directions.includes(direction)) return;

      const isVerticalMove =
        direction === 'ArrowDown' || direction === 'ArrowUp';

      /***#1 Reset the tile states***/
      const resetedBoard = resetTileStates(board);

      /***#2 Change Orientation for Vertical move***/
      const orientedBoard = isVerticalMove
        ? transposeArray(resetedBoard)
        : resetedBoard;

      /***#3 Update Board after slide move***/
      let totalScoreGained = 0;

      const updatedBoard = orientedBoard.map((line) => {
        const slideResult = slideLine(line, direction);

        const { newLine, scoreGained } = slideResult;

        totalScoreGained += scoreGained;

        return newLine;
      });

      const isBoardChanged = orientedBoard.some((row, rowIndex) =>
        row.some(
          (tile, colIndex) =>
            tile.value !== updatedBoard[rowIndex][colIndex].value,
        ),
      );

      if (!isBoardChanged) return;

      /***#4 Update Score***/
      const newScore = score + totalScoreGained;
      const newMaxValue = getMaxValue(updatedBoard);
      const newHighScore = newScore > highScore ? newScore : highScore;

      /***#5 Add new number to the board if has changed***/
      const boardWithNewNumber = addNewNumberToBoard(updatedBoard);

      const finalBoard = isVerticalMove
        ? transposeArray(boardWithNewNumber)
        : boardWithNewNumber;

      /***#6 Set the new state***/
      setPrevBoard(board);
      setBoard(finalBoard);
      setCanBack(true);
      setPrevScore(score);
      setScore(newScore);
      setHighScore(newHighScore);
      setMaxValue(newMaxValue);

      saveInStorage({
        board: finalBoard,
        score: newScore,
        highScore: newHighScore,
        maxValue: newMaxValue,
      });
    },
    [board, score, highScore],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const direction = event.key as Directions;
      handleMove(direction);
    },
    [handleMove],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    board,
    reload,
    backPrevBoard,
    canBack,
    score,
    highScore,
    maxValue,
    handleMove,
  };
}
