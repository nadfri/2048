import { useEffect } from 'react';
import StarIcon from '../StarIcon/StarIcon';
import './Score.scss';

type Props = {
  score: number;
  highScore: number;
  maxValue: number;
};

export default function Score({ score, highScore, maxValue }: Props) {
  useEffect(() => {
    document.title = `2048 | ${maxValue > 2048 ? maxValue + ' ✪' : maxValue}`;
  }, [maxValue]);

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
