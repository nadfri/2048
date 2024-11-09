import './Board.scss';
import { useRef } from 'react';
import Tile from '../Tile/Tile';
import { LINES } from '@/utils/init';
import useTouchMove from '@/hooks/useTouchMove';
import { useStoreBoard } from '@/store/useStoreBoard';

export default function Board() {
  const { board } = useStoreBoard();
  const ref = useRef<HTMLDivElement>(null);
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  useTouchMove(ref);

  return (
    <div className="Board fade-in" ref={ref}>
      <div className="grid" style={style}>
        {board.flat().map((tile, index: number) => {
          const key = `${tile.value}-${tile.isNew}-${tile.isMerged}-${tile.direction}-${index}`;
          return <Tile tile={tile} key={key} />;
        })}
      </div>
    </div>
  );
}
