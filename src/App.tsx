import './App.scss';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import BtnAction from './components/BtnAction/BtnAction';
import Title from './components/Title/Title';
import RotateDevice from './components/RotateDevice/RotateDevice';
import ReloadPWA from './components/PWA/ReloadPWA/ReloadPWA';
import InstallPWA from './components/PWA/InstallPWA/InstallPWA';
import { useRef } from 'react';
import { useKeyMove } from './hooks/useKeyMove';
import useTouchMove from './hooks/useTouchMove';

function App() {
  const ref = useRef<HTMLDivElement>(null);

  /*Handle keyboard and touch events */
  useKeyMove();
  useTouchMove(ref);

  return (
    <div className="App">
      <Title />

      <Score />

      <Board ref={ref} />

      <BtnAction />

      <RotateDevice />

      <ReloadPWA />
      <InstallPWA />
    </div>
  );
}

export default App;
