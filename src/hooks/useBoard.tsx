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

  const [board, setBoard] = useState(dataStorage?.board || newBoard());
  const [prevBoard, setPrevBoard] = useState<TileType[][] | null>(null);
  const [canBack, setCanBack] = useState(false);
  const [score, setScore] = useState(dataStorage?.score || 0);
  const [highScore, setHighScore] = useState(dataStorage?.highScore || 0);
  const [maxValue, setMaxValue] = useState(dataStorage?.maxValue || 0);

  const reload = () => {
    setBoard(newBoard());
    setScore(0);
    setMaxValue(0);
    setCanBack(false);
    saveInStorage({ board: null, score: 0, highScore, maxValue: 0 });
  };

  const backPrevBoard = () => {
    if (!prevBoard) return;

    setBoard(prevBoard);
    setCanBack(false);

    const prevScore = prevBoard
      .flat()
      .reduce((acc, tile) => acc + tile.value, 0);

    setScore((prev) => prev - prevScore);

    saveInStorage({
      board: prevBoard,
      score: score - prevScore,
      highScore,
      maxValue,
    });
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

      /***#4 Update Score***/
      const newScore =
        score + updatedBoard.flat().reduce((acc, tile) => acc + tile.value, 0);

      setScore(newScore);

      const newMaxValue = getMaxValue(updatedBoard);
      setMaxValue(newMaxValue);

      const newHighScore = newScore > highScore ? newScore : highScore;
      setHighScore(newHighScore);

      /***#4 Add new number to the board if has changed***/
      const boardWithNewNumber = addNewNumberToBoard(updatedBoard);

      const finalBoard = isVerticalMove
        ? transposeArray(boardWithNewNumber)
        : boardWithNewNumber;

      setPrevBoard(board);
      setBoard(finalBoard);
      setCanBack(true);

      saveInStorage({
        board: finalBoard,
        score: newScore,
        highScore: newHighScore,
        maxValue: newMaxValue,
      });
    },
    [board, highScore, score],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleMove);

    /*CleanUp*/
    return () => window.removeEventListener('keydown', handleMove);
  }, [handleMove]);

  return {
    board,
    reload,
    backPrevBoard,
    canBack,
    score,
    highScore,
    maxValue,
  };
}
