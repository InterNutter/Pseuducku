import React, { useState } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [gameType, setGameType] = useState('4x4');

  return (
    <div className="app" style={{
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>Pseuducku</h1>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setGameType('4x4')}
          style={{
            backgroundColor: gameType === '4x4' ? '#4CAF50' : '#ccc',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          4x4 Game
        </button>
        <button
          onClick={() => setGameType('9x9')}
          style={{
            backgroundColor: gameType === '9x9' ? '#4CAF50' : '#ccc',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          9x9 Game
        </button>
      </div>
      <GameBoard gameType={gameType} />
    </div>
  );
}

export default App; 