import Tile from '../Tile/Tile';
import './Title.scss';

export default function Title({ maxValue }: { maxValue: number }) {
  const tile = {
    value: maxValue,
    isNew: false,
    isMerged: false,
    direction: null,
  };

  return (
    <h1 className="Title">
      <span className="title-2048">{maxValue < 2048 ? '2048' : maxValue}</span>

      {maxValue > 2 ? (
        <Tile tile={tile} />
      ) : (
        <div className="place-holder"></div>
      )}
    </h1>
  );
}
