import './App.scss';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';

function App() {
  const { reset, board, backPrevBoard, canBack } = useBoard();

  return (
    <div className="App">
      <h1>2048</h1>

      <Board board={board} />

      <button className="reset" onClick={reset}>
        RESET
      </button>

      <button className="reset" onClick={backPrevBoard} disabled={!canBack}>
        BACK
      </button>
    </div>
  );
}

export default App;
