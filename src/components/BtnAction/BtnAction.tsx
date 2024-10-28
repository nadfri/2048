import ReloadIcon from '../ReloadIcon/ReloadIcon';
import './BtnAction.scss';

type Props = {
  reload: () => void;
  backPrevBoard: () => void;
  canBack: boolean;
};

export default function BtnAction({ reload, backPrevBoard, canBack }: Props) {
  return (
    <div className="BtnAction">
      <button className="btn-reload" onClick={reload}>
        <ReloadIcon />
      </button>

      <button className="btn-back" onClick={backPrevBoard} disabled={!canBack}>
        <span className="arrow">↼</span> <span>BACK</span>
      </button>
    </div>
  );
}
