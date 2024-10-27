import './Tile.scss';

export default function Tile({ value }: { value: number }) {
  const backgroundColor = `var(--tile-${value}-color)`;

  return (
    <div className="Tile" style={{ backgroundColor }}>
      {value ? value : ''}
    </div>
  );
}
