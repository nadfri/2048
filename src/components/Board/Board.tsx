import './Board.scss';
import Tile from '../Tile/Tile';
import { Directions, TileType } from '@/types/types';
import { LINES } from '@/utils/init';
import useTouchMove from '@/hooks/useTouchMove';
import { useRef } from 'react';

type Props = {
  board: TileType[][];
  handleMove: (direction: Directions) => void;
};

export default function Board({ board, handleMove }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  useTouchMove({ handleMove, ref });

  return (
    <div className="Board fade-in" style={style} ref={ref}>
      {board.flat().map((tile, index: number) => {
        const key = `${tile.value}-${tile.isNew}-${tile.isMerged}-${tile.direction}-${index}`;
        return <Tile tile={tile} key={key} />;
      })}
    </div>
  );
}
