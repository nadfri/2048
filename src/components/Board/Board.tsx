import './Board.scss';
import Tile from '../Tile/Tile';
import { TileType } from '@/types/types';
import { LINES } from '@/utils/init';

export default function Board({ board }: { board: TileType[][] }) {
  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  /*Unique key to replay tile's animation*/

  return (
    <div className="Board fade-in" style={style}>
      {board.flat().map((tile, index: number) => {
        const key = `${tile.value}-${tile.isNew}-${tile.isMerged}-${tile.direction}-${index}`;
        return <Tile tile={tile} key={key} />;
      })}
    </div>
  );
}
