import React from 'react';

const ControlButtons = ({
  onInfo,
  onHelp,
  onUndo,
  onErase,
  onHint,
  onRuler,
  onPrevious,
  onNext,
  canUndo,
  canErase,
  canHint,
  canRuler,
  canNavigate,
  hasPreviousPuzzle,
  hasNextPuzzle
}) => {
  return (
    <div style={{
      position: 'absolute',
      right: '-100px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <button
        onClick={onInfo}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          width: '60px',
          height: '60px'
        }}
      >
        <img
          src="/src/assets/tiles/ui/Button_info.png"
          alt="Info"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onHelp}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          width: '60px',
          height: '60px'
        }}
      >
        <img
          src="/src/assets/tiles/ui/Button_help.png"
          alt="Help"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: canUndo ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: canUndo ? 1 : 0.5
        }}
      >
        <img
          src={canUndo ? "/src/assets/tiles/ui/Button_undo.png" : "/src/assets/tiles/ui/B-button-undo.png"}
          alt="Undo"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onErase}
        disabled={!canErase}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: canErase ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: canErase ? 1 : 0.5
        }}
      >
        <img
          src={canErase ? "/src/assets/tiles/ui/Button_erase.png" : "/src/assets/tiles/ui/B-button-erase.png"}
          alt="Erase"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onHint}
        disabled={!canHint}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: canHint ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: canHint ? 1 : 0.5
        }}
      >
        <img
          src={canHint ? "/src/assets/tiles/ui/Button_hint.png" : "/src/assets/tiles/ui/B-button-hint.png"}
          alt="Hint"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onRuler}
        disabled={!canRuler}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: canRuler ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: canRuler ? 1 : 0.5
        }}
      >
        <img
          src={canRuler ? "/src/assets/tiles/ui/Button_Ruler.png" : "/src/assets/tiles/ui/B-button-Ruler.png"}
          alt="Ruler"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onPrevious}
        disabled={!hasPreviousPuzzle}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: hasPreviousPuzzle ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: hasPreviousPuzzle ? 1 : 0.5
        }}
      >
        <img
          src={hasPreviousPuzzle ? "/src/assets/tiles/ui/Button_arrow_L.png" : "/src/assets/tiles/ui/B-button-arrow_L.png"}
          alt="Previous"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNextPuzzle}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: hasNextPuzzle ? 'pointer' : 'default',
          width: '60px',
          height: '60px',
          opacity: hasNextPuzzle ? 1 : 0.5
        }}
      >
        <img
          src={hasNextPuzzle ? "/src/assets/tiles/ui/Button_arrow_R.png" : "/src/assets/tiles/ui/B-button-arrow_R.png"}
          alt="Next"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
    </div>
  );
};

export default ControlButtons; 