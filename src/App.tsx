import './App.scss';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';
import Score from './components/Score/Score';
import BtnAction from './components/BtnAction/BtnAction';

function App() {
  const {
    reload,
    board,
    backPrevBoard,
    canBack,
    score,
    highScore,
    maxValue,
    handleTouchStart,
    handleTouchEnd,
  } = useBoard();

  return (
    <div className="App">
      <h1>{maxValue < 2048 ? '2048' : maxValue}</h1>

      <Score score={score} highScore={highScore} maxValue={maxValue} />

      <Board
        board={board}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
      />

      <BtnAction
        reload={reload}
        backPrevBoard={backPrevBoard}
        canBack={canBack}
      />
    </div>
  );
}

export default App;
