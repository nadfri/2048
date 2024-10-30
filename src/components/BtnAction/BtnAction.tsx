import { useState } from 'react';
import ReloadIcon from '../ReloadIcon/ReloadIcon';
import './BtnAction.scss';
import ScreenIcon from '../ScreenIcon/ScreenIcon';
import ExitIcon from '../ExitIcon/ExitIcon';
import Tile from '../Tile/Tile';

type Props = {
  reload: () => void;
  backPrevBoard: () => void;
  canBack: boolean;
  maxValue: number;
};

export default function BtnAction({
  reload,
  backPrevBoard,
  canBack,
  maxValue,
}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const tile = {
    value: maxValue,
    isNew: false,
    isMerged: false,
    direction: null,
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error(err.message));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error(err.message));
    }
  };

  return (
    <div className="BtnAction">
      {maxValue > 2 && <Tile tile={tile} />}

      {!isIOS && (
        <button onClick={toggleFullscreen} className="btn-icon">
          {isFullscreen ? <ExitIcon /> : <ScreenIcon />}
        </button>
      )}

      <button className="btn-icon btn-reload" onClick={reload}>
        <ReloadIcon />
      </button>

      <button className="btn-back" onClick={backPrevBoard} disabled={!canBack}>
        <span className="arrow">↼</span> <span>BACK</span>
      </button>
    </div>
  );
}
