import { useState } from 'react';
import ReloadIcon from '../ReloadIcon/ReloadIcon';
import './BtnAction.scss';
import ScreenIcon from '../ScreenIcon/ScreenIcon';
import ExitIcon from '../ExitIcon/ExitIcon';

type Props = {
  reload: () => void;
  backPrevBoard: () => void;
  canBack: boolean;
};

export default function BtnAction({ reload, backPrevBoard, canBack }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <button onClick={toggleFullscreen} className="btn-full">
        {isFullscreen ? <ExitIcon /> : <ScreenIcon />}
      </button>

      <button className="btn-reload" onClick={reload}>
        <ReloadIcon />
      </button>

      <button className="btn-back" onClick={backPrevBoard} disabled={!canBack}>
        <span className="arrow">↼</span> <span>BACK</span>
      </button>
    </div>
  );
}
