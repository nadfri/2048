import { create } from 'zustand';
import { newBoard } from '@/utils/init';
import { getFromStorage, saveInStorage } from '@/utils/storage';
import {
  resetTileStates,
  transposeArray,
  slideLine,
  getMaxValue,
  addNewNumberToBoard,
  directions,
} from '@/utils/utils';
import { StoreStateType } from '@/types/types';

export const useStoreBoard = create<StoreStateType>((set, get) => ({
  board: getFromStorage()?.board || newBoard(),
  prevBoard: getFromStorage()?.prevBoard || null,
  canBack: getFromStorage()?.canBack || false,
  score: getFromStorage()?.score || 0,
  prevScore: getFromStorage()?.prevScore || 0,
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
      prevBoard: null,
      canBack: false,
      score: 0,
      prevScore: 0,
      highScore: 0,
      maxValue: 0,
    });
  },

  backPrevBoard: () => {
    set((state) => {
      if (state.prevBoard) {
        saveInStorage({
          prevBoard: null,
          board: state.prevBoard,
          canBack: false,
          score: state.prevScore,
          prevScore: 0,
          highScore: state.highScore,
          maxValue: getMaxValue(state.prevBoard),
        });

        return {
          prevBoard: null,
          board: state.prevBoard,
          score: state.prevScore,
          canBack: false,
          maxValue: getMaxValue(state.prevBoard),
        };
      }
      return {};
    });
  },

  updateMove: (finalBoard) => {
    set((state) => {
      saveInStorage({
        prevBoard: state.board,
        board: finalBoard,
        canBack: true,
        prevScore: state.prevScore,
        score: state.score,
        highScore: state.highScore,
        maxValue: getMaxValue(finalBoard),
      });

      return {
        prevBoard: state.board,
        board: finalBoard,
        canBack: true,
        score: state.score,
        highScore: state.highScore,
        maxValue: getMaxValue(finalBoard),
      };
    });
  },

  updateScore: (scoreGained: number) =>
    set((state) => {
      const newPrevScore = state.score;
      const newScore = state.score + scoreGained;

      const newHighScore =
        newScore > state.highScore ? newScore : state.highScore;

      return {
        score: newScore,
        prevScore: newPrevScore,
        highScore: newHighScore,
      };
    }),

  handleMove: (direction) => {
    const { board, updateMove } = get();

    if (!directions.includes(direction)) return;

    const isVerticalMove = direction === 'ArrowDown' || direction === 'ArrowUp';

    /***#1 Reset the tile states***/
    const resetedBoard = resetTileStates(board);

    /***#2 Change Orientation for Vertical move***/
    const orientedBoard = isVerticalMove
      ? transposeArray(resetedBoard)
      : resetedBoard;

    /***#3 Update Board and score after slide move***/
    const updatedBoard = orientedBoard.map((line) =>
      slideLine(line, direction),
    );

    const isBoardChanged = orientedBoard.some((row, rowIndex) =>
      row.some(
        (tile, colIndex) =>
          tile.value !== updatedBoard[rowIndex][colIndex].value,
      ),
    );

    if (!isBoardChanged) return;

    /***#4 Add a new number***/
    const boardWithNewNumber = addNewNumberToBoard(updatedBoard);
    const finalBoard = isVerticalMove
      ? transposeArray(boardWithNewNumber)
      : boardWithNewNumber;

    /***#5 Update State***/
    updateMove(finalBoard);
  },
}));
