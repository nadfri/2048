import './Board.scss';
import Tile from '../Tile/Tile';
import { TileType } from '@/types/types';
import { LINES } from '@/utils/init';
import { useRef, useEffect } from 'react';

type Props = {
  board: TileType[][];
  handleTouchStart: (event: TouchEvent) => void;
  handleTouchEnd: (event: TouchEvent) => void;
};

export default function Board({
  board,
  handleTouchStart,
  handleTouchEnd,
}: Props) {
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boardEl = boardRef.current;
    if (boardEl) {
      boardEl.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
      boardEl.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    return () => {
      if (boardEl) {
        boardEl.removeEventListener('touchstart', handleTouchStart);
        boardEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleTouchStart, handleTouchEnd]);

  return (
    <div className="Board fade-in" style={style} ref={boardRef}>
      {board.flat().map((tile, index: number) => {
        const key = `${tile.value}-${tile.isNew}-${tile.isMerged}-${tile.direction}-${index}`;
        return <Tile tile={tile} key={key} />;
      })}
    </div>
  );
}
