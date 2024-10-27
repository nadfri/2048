import './Board.scss';
import Tile from '../Tile/Tile';
import useBoard from '@/hooks/useBoard';
import { LINES } from '@/utils/init';

export default function Board() {
  const { board } = useBoard();

  const style = { gridTemplateColumns: `repeat(${LINES}, 1fr)` };

  return (
    <div className="Board" style={style}>
      {board.flat().map((value: number, position: number) => (
        <Tile key={position} value={value} />
      ))}
    </div>
  );
}
