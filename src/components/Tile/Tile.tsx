import { TileType } from '@/types/types';
import './Tile.scss';

export default function Tile({ tile }: { tile: TileType }) {
  const backgroundColor = `var(--tile-${tile.value}-color)`;

  let className = 'value';

  if (tile.isNew) className += ' scale';

  if (tile.direction && !tile.isMerged) className += ` slide-${tile.direction}`;

  if (tile.isMerged) className += ` slide-merge-${tile.direction}`;

  const fontSize = tile.value > 512 ? '1.45rem' : '1.8rem';

  return (
    <div className="Tile">
      <div className={className} style={{ backgroundColor, fontSize }}>
        <span>{tile.value || ''}</span>
      </div>
    </div>
  );
}
