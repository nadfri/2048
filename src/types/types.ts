export type Directions = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

export type TileType = {
  value: number;
  isNew: boolean;
  isMerged: boolean;
  direction: Directions | null;
};

export type StorageType = {
  board: TileType[][] | null;
  prevBoard: TileType[][] | null;
  canBack: boolean;
  score: number;
  prevScore: number;
  highScore: number;
  maxValue: number;
} | null;

export type StoreStateType = {
  /* State */
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
  updateMove: (finalBoard: TileType[][]) => void;
  handleMove: (direction: Directions) => void;
  updateScore: (scoreGained: number) => void;
};
