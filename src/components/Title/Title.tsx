import Tile from '../Tile/Tile';
import './Title.scss';

export default function Title({ maxValue }: { maxValue: number }) {
  const tile = {
    value: maxValue,
    isNew: true,
    isMerged: false,
    direction: null,
  };

  return (
    <h1 className="Title">
      {maxValue < 2048 ? '2048' : maxValue}
      {maxValue > 16 && <Tile tile={tile} />}
    </h1>
  );
}
