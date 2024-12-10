import './Board.scss';
import Tile from '../Tile/Tile';
import { LINES } from '@/utils/init';
import { useStoreBoard } from '@/store/useStoreBoard';

export default function Board({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const { board } = useStoreBoard();

  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

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
