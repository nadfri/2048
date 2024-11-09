import { newBoard } from '@/utils/init';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StoreStateType } from '@/types/types';
import {
  resetTileStates,
  transposeArray,
  slideLine,
  getMaxValue,
  addNewNumberToBoard,
  directions,
} from '@/utils/utils';

const persistConfig: PersistOptions<StoreStateType> = {
  name: '2048-NADFRI-JS',
};

export const useStoreBoard = create<
  StoreStateType,
  [['zustand/persist', StoreStateType]]
>(
  persist(
    (set, get) => ({
      board: newBoard(),
      prevBoard: null,
      canBack: false,
      score: 0,
      prevScore: 0,
      highScore: 0,
      maxValue: 0,

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
        set((state) => ({
          ...state,
          board: newBoard(),
          prevBoard: null,
          canBack: false,
          score: 0,
          prevScore: 0,
          maxValue: 0,
        }));
      },

      backPrevBoard: () => {
        set((state) => {
          if (state.prevBoard) {
            return {
              ...state,
              prevBoard: null,
              board: state.prevBoard,
              canBack: false,
              score: state.prevScore,
              prevScore: 0,
              maxValue: getMaxValue(state.prevBoard),
            };
          }
          return state;
        });
      },

      updateMove: (finalBoard) => {
        set((state) => ({
          ...state,
          prevBoard: state.board,
          board: finalBoard,
          canBack: true,
          maxValue: getMaxValue(finalBoard),
        }));
      },

      updateScore: (scoreGained: number) =>
        set((state) => ({
          score: state.score + scoreGained,
          prevScore: state.score,
          highScore: Math.max(state.score + scoreGained, state.highScore),
        })),

      handleMove: (direction) => {
        const { board, updateMove } = get();

        if (!directions.includes(direction)) return;

        const isVerticalMove =
          direction === 'ArrowDown' || direction === 'ArrowUp';

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

        const isBoardChanged =
          JSON.stringify(orientedBoard) !== JSON.stringify(updatedBoard);

        if (!isBoardChanged) return;

        /***#4 Add a new number***/
        const boardWithNewNumber = addNewNumberToBoard(updatedBoard);
        const finalBoard = isVerticalMove
          ? transposeArray(boardWithNewNumber)
          : boardWithNewNumber;

        /***#5 Update State***/
        updateMove(finalBoard);
      },
    }),
    persistConfig,
  ),
);
