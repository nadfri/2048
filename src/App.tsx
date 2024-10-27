import './App.scss';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';

function App() {
  const { reset, board } = useBoard();

  return (
    <div className="App">
      <h1>2048</h1>
      <Board board={board} />

      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
}

export default App;
