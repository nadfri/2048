import { create } from 'zustand';
import { Directions, TileType } from '@/types/types';
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

type StoreState = {
  board: TileType[][];
  prevBoard: TileType[][] | null;
  canBack: boolean;
  score: number;
  prevScore: number;
  highScore: number;
  maxValue: number;
  /* Setters */
  setBoard: (board: TileType[][]) => void;
  setPrevBoard: (prevBoard: TileType[][] | null) => void;
  setCanBack: (canBack: boolean) => void;
  setScore: (score: number) => void;
  setPrevScore: (prevScore: number) => void;
  setHighScore: (highScore: number) => void;
  setMaxValue: (maxValue: number) => void;
  /* Actions */
  reload: () => void;
  backPrevBoard: () => void;
  updateMove: (
    finalBoard: TileType[][],
    newScore: number,
    newHighScore: number,
    newMaxValue: number,
  ) => void;
  handleMove: (direction: Directions) => void;
};

export const useStoreBoard = create<StoreState>((set, get) => ({
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

    // Réinitialiser les états des tuiles
    const resetedBoard = resetTileStates(board);

    // Changer l'orientation pour un mouvement vertical
    const orientedBoard = isVerticalMove
      ? transposeArray(resetedBoard)
      : resetedBoard;

    // Mettre à jour le tableau après le glissement
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

    // Mettre à jour le score
    const newScore = score + totalScoreGained;
    const newMaxValue = getMaxValue(updatedBoard);
    const newHighScore = newScore > highScore ? newScore : highScore;

    // Ajouter un nouveau numéro au tableau si modifié
    const boardWithNewNumber = addNewNumberToBoard(updatedBoard);
    const finalBoard = isVerticalMove
      ? transposeArray(boardWithNewNumber)
      : boardWithNewNumber;

    // Mettre à jour l'état
    get().updateMove(finalBoard, newScore, newHighScore, newMaxValue);
  },
}));
