import { useState } from 'react';
import ReloadIcon from '../Icons/ReloadIcon/ReloadIcon';
import './BtnAction.scss';
import ScreenIcon from '../Icons/ScreenIcon/ScreenIcon';
import ExitIcon from '../Icons/ExitIcon/ExitIcon';
import GithubIcon from '../Icons/GithubIcon/GithubIcon';
import { useStoreBoard } from '@/store/useStoreBoard';

export default function BtnAction() {
  const { reload, backPrevBoard, canBack } = useStoreBoard();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
      <a
        className="git-link"
        href="https://github.com/nadfri/2048"
        target="_blank"
      >
        <GithubIcon />
        <span className="pseudo">NADFRI JS</span>
      </a>

      {!isIOS && (
        <button
          onClick={toggleFullscreen}
          className="btn-icon"
          aria-label={
            isFullscreen ? 'Exit from fullscreen' : 'Enter to fullscreen'
          }
        >
          {isFullscreen ? <ExitIcon /> : <ScreenIcon />}
        </button>
      )}

      <button className="btn-icon" onClick={reload} aria-label="Reload Game">
        <ReloadIcon className="ReloadIcon" />
      </button>

      <button className="btn-back" onClick={backPrevBoard} disabled={!canBack}>
        <span>BACK</span>
      </button>
    </div>
  );
}
