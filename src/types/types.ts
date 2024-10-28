export type Directions = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp';

export type TileType = {
  value: number;
  isNew: boolean;
  isMerged: boolean;
  direction: Directions | null;
};
