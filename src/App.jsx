import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import stage3Manager from './utils/stage3Manager';
import './index.css';

function App() {
  const [gameType, setGameType] = useState('4x4');
  const [stage, setStage] = useState(1);

  // Stage management - each stage has a specific game type
  const handleStageChange = (newStage) => {
    setStage(newStage);
    if (newStage === 1) {
      setGameType('4x4'); // Stage 1 uses 4x4
    } else if (newStage === 2) {
      setGameType('9x9'); // Stage 2 uses 9x9
    } else if (newStage === 3) {
      setGameType('9x9'); // Stage 3 uses 9x9
      // Initialize Stage 3 manager
      stage3Manager.initializeStage3(1);
    }
  };

  const handleGameTypeChange = (newGameType) => {
    setGameType(newGameType);
    if (newGameType === '9x9' && stage < 3) {
      setStage(2); // 9x9 games are Stage 2
    } else if (newGameType === '4x4' && stage > 1) {
      setStage(1); // 4x4 games are Stage 1
    }
  };

  // Initialize Stage 3 if needed on component mount
  useEffect(() => {
    if (stage === 3) {
      stage3Manager.initializeStage3(1);
    }
  }, [stage]);

  return (
    <div className="app">
      <h1>Pseuducku</h1>
      
      <GameBoard 
        gameType={gameType} 
        stage={stage}
        initialPieces={{}}
        hasPreviousPuzzle={false}
        hasNextPuzzle={false}
        onStageChange={handleStageChange}
      />
    </div>
  );
}

export default App; 