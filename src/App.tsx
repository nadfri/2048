import './App.scss';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';
import Score from './components/Score/Score';
import BtnAction from './components/BtnAction/BtnAction';
import Title from './components/Title/Title';

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

  return (
    <div className="App">
      <Title maxValue={maxValue} />

      <Score score={score} highScore={highScore} maxValue={maxValue} />

      <Board board={board} handleMove={handleMove} />

      <BtnAction
        reload={reload}
        backPrevBoard={backPrevBoard}
        canBack={canBack}
      />
    </div>
  );
}

export default App;
