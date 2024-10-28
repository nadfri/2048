import StarIcon from '../StarIcon/StarIcon';
import './Score.scss';

type Props = {
  score: number;
  highScore: number;
};

export default function Score({ score, highScore }: Props) {
  return (
    <div className="Score">
      <div className="score high-score">
        <StarIcon />
        <span>{highScore}</span>
      </div>
      <div className="score">{score}</div>
    </div>
  );
}
