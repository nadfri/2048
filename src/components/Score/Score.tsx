import { useEffect } from 'react';
import './Score.scss';
import { useStoreBoard } from '@/store/useStoreBoard';

export default function Score() {
  const { score, highScore, maxValue } = useStoreBoard();

  useEffect(() => {
    document.title = `2048 | ${maxValue > 2048 ? maxValue + ' ✪' : maxValue}`;

    document.body.style.backgroundColor =
      maxValue < 2048 ? 'var(--bg-color)' : 'var(--bg-dark)';
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
