import { Direction } from '@/utils/utils';
import './Tile.scss';

export type TileType = {
  value: number;
  isNew: boolean;
  isMerged: boolean;
  direction: Direction | null;
};

export default function Tile({ tile }: { tile: TileType }) {
  const backgroundColor = `var(--tile-${tile.value}-color)`;

  let className = 'value';

  if (tile.isNew) className += ' scale';

  if (tile.direction && !tile.isMerged) className += ` slide-${tile.direction}`;

  if (tile.isMerged) className += ` slide-merge-${tile.direction}`;

  return (
    <div className="Tile">
      <div className={className} style={{ backgroundColor }}>
        <span>{tile.value || ''}</span>
      </div>
    </div>
  );
}
