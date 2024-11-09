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

const storage = getFromStorage();

export const useStoreBoard = create<StoreStateType>((set, get) => ({
  board: storage?.board || newBoard(),
  prevBoard: storage?.prevBoard || null,
  canBack: storage?.canBack || false,
  score: storage?.score || 0,
  prevScore: storage?.prevScore || 0,
  highScore: storage?.highScore || 0,
  maxValue: storage?.maxValue || 0,

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
    set((state) => {
      const newState = {
        ...state,
        board: newBoard(),
        prevBoard: null,
        canBack: false,
        score: 0,
        prevScore: 0,
        maxValue: 0,
      };

      saveInStorage(newState);

      return newState;
    });
  },

  backPrevBoard: () => {
    set((state) => {
      if (state.prevBoard) {
        const newState = {
          ...state,
          prevBoard: null,
          board: state.prevBoard,
          canBack: false,
          score: state.prevScore,
          prevScore: 0,
          maxValue: getMaxValue(state.prevBoard),
        };

        saveInStorage(newState);

        return newState;
      }
      return state;
    });
  },

  updateMove: (finalBoard) => {
    set((state) => {
      const newState = {
        ...state,
        prevBoard: state.board,
        board: finalBoard,
        canBack: true,
        score: state.score,
        highScore: state.highScore,
        maxValue: getMaxValue(finalBoard),
      };

      saveInStorage(newState);

      return newState;
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

    /***#3 Update Board and Score after slide move***/
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
