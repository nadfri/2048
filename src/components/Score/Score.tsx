import { useEffect } from 'react';
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
        <span className="score-title">HIGH SC✪RE</span>
        <span className="score-value">{highScore}</span>
      </div>

      <div className="score">
        <span className="score-title">SC✪RE</span>{' '}
        <span className="score-value">{score}</span>
      </div>
    </div>
  );
}
