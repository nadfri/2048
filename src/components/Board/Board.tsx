import './Board.scss';
import Tile from '../Tile/Tile';
import { TileType } from '@/types/types';

import { LINES } from '@/utils/init';

export default function Board({ board }: { board: TileType[][] }) {
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  return (
    <div className="Board fade-in" style={style}>
      {board.flat().map((tile, position: number) => (
        <Tile key={position} tile={tile} />
      ))}
    </div>
  );
}
