import './App.scss';
import Board from './components/Board/Board';
import ReloadIcon from './components/ReloadIcon/ReloadIcon';
import { useBoard } from './hooks/useBoard';

function App() {
  const { reload, board, backPrevBoard, canBack } = useBoard();

  return (
    <div className="App">
      <h1>2048</h1>

      <Board board={board} />

      <div className="container-btns">
        <button className="btn-reload" onClick={reload}>
          <ReloadIcon />
        </button>

        <button
          className="btn-back"
          onClick={backPrevBoard}
          disabled={!canBack}
        >
          <span className="arrow">↼</span> <span>BACK</span>
        </button>
      </div>
    </div>
  );
}

export default App;
