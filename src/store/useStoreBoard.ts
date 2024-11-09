import { create } from 'zustand';
import { newBoard } from '@/utils/init';
import { getFromStorage, saveInStorage } from '@/utils/storage';
import {
  directions,
  resetTileStates,
  transposeArray,
  slideLine,
  getMaxValue,
  addNewNumberToBoard,
} from '@/utils/utils';
import { StoreStateType } from '@/types/types';

export const useStoreBoard = create<StoreStateType>((set, get) => ({
  board: getFromStorage()?.board || newBoard(),
  prevBoard: null,
  canBack: false,
  score: getFromStorage()?.score || 0,
  prevScore: getFromStorage()?.score || 0,
  highScore: getFromStorage()?.highScore || 0,
  maxValue: getFromStorage()?.maxValue || 0,

  /* Setters */
  setBoard: (board) => set({ board }),
  setPrevBoard: (prevBoard) => set({ prevBoard }),
  setCanBack: (canBack) => set({ canBack }),
  setScore: (score) => set({ score }),
  setPrevScore: (prevScore) => set({ prevScore }),
  setHighScore: (highScore) => set({ highScore }),
  setMaxValue: (maxValue) => set({ maxValue }),

  /* Actions */
  reload: () => {
    const newInitialBoard = newBoard();
    set({ board: newInitialBoard, score: 0, maxValue: 0, canBack: false });
    saveInStorage({
      board: newInitialBoard,
      score: 0,
      highScore: 0,
      maxValue: 0,
    });
  },

  backPrevBoard: () => {
    set((state) => {
      if (state.prevBoard) {
        return {
          board: state.prevBoard,
          score: state.prevScore,
          canBack: false,
          maxValue: state.maxValue,
        };
      }
      return {};
    });
  },

  updateMove: (finalBoard, newScore, newHighScore, newMaxValue) => {
    set((state) => ({
      prevBoard: state.board,
      board: finalBoard,
      canBack: true,
      prevScore: state.score,
      score: newScore,
      highScore: newHighScore,
      maxValue: newMaxValue,
    }));

    saveInStorage({
      board: finalBoard,
      score: newScore,
      highScore: newHighScore,
      maxValue: newMaxValue,
    });
  },

  handleMove: (direction) => {
    const { board, score, highScore } = get();
    if (!directions.includes(direction)) return;

    const isVerticalMove = direction === 'ArrowDown' || direction === 'ArrowUp';

    /***#1 Reset the tile states***/
    const resetedBoard = resetTileStates(board);

    /***#2 Change Orientation for Vertical move***/
    const orientedBoard = isVerticalMove
      ? transposeArray(resetedBoard)
      : resetedBoard;

    /***#3 Update Board after slide move***/
    let totalScoreGained = 0;

    const updatedBoard = orientedBoard.map((line) => {
      const { newLine, scoreGained } = slideLine(line, direction);
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
    get().updateMove(finalBoard, newScore, newHighScore, newMaxValue);
  },
}));
