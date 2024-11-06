import './App.scss';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';
import Score from './components/Score/Score';
import BtnAction from './components/BtnAction/BtnAction';
import Title from './components/Title/Title';
import RotateDevice from './components/RotateDevice/RotateDevice';
import ReloadPWA from './components/ReloadPWA/ReloadPWA';
import { useRef } from 'react';
import useTouchMove from './hooks/useTouchMove';

function App() {
  const {
    reload,
    board,
    backPrevBoard,
    canBack,
    score,
    highScore,
    maxValue,
    handleMove,
  } = useBoard();

  const ref = useRef<HTMLDivElement>(null);
  useTouchMove({ handleMove, ref });

  return (
    <div className="App">
      <Title maxValue={maxValue} />

      <Score score={score} highScore={highScore} maxValue={maxValue} />

      <div className="touch-container" ref={ref}>
        <Board board={board} />

        <BtnAction
          reload={reload}
          backPrevBoard={backPrevBoard}
          canBack={canBack}
        />
      </div>

      <RotateDevice />

      <ReloadPWA />
    </div>
  );
}

export default App;
