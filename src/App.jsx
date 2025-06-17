import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './index.css';

function App() {
  const [gameType, setGameType] = useState('4x4');

  return (
    <div className="app">
      <h1>Pseuducku</h1>
      <div className="game-type-selector">
        <button
          className={gameType === '4x4' ? 'active' : ''}
          onClick={() => setGameType('4x4')}
        >
          4x4 Game
        </button>
        <button
          className={gameType === '9x9' ? 'active' : ''}
          onClick={() => setGameType('9x9')}
        >
          9x9 Game
        </button>
      </div>
      <GameBoard 
        gameType={gameType} 
        stage={1}
        initialPieces={{}}
        hasPreviousPuzzle={false}
        hasNextPuzzle={false}
      />
    </div>
  );
}

export default App; 