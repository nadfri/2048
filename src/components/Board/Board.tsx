import './Board.scss';
import Tile, { TileType } from '../Tile/Tile';
import { LINES } from '@/utils/init';

export default function Board({ board }: { board: TileType[][] }) {
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  return (
    <div className="Board" style={style}>
      {board.flat().map((tile, position: number) => (
        <Tile key={position} tile={tile} />
      ))}
    </div>
  );
}
