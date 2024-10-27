import './Tile.scss';

export default function Tile({ value }: { value: number | string }) {
  const backgroundColor = `var(--tile-${value}-color)`;

  return (
    <div className="Tile" style={{ backgroundColor }}>
      {value ? value : ''}
    </div>
  );
}
