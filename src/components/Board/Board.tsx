import './Board.scss';
import Tile from '../Tile/Tile';
import { TileType } from '@/types/types';
import { LINES } from '@/utils/init';

export default function Board({ board }: { board: TileType[][] }) {
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  /*Unique key to replay each tile's animation*/

  return (
    <div className="Board fade-in" style={style}>
      {board.flat().map((tile, index: number) => (
        <Tile key={`${index}-${Date.now()}`} tile={tile} />
      ))}
    </div>
  );
}
