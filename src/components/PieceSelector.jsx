import React from 'react';

const PieceSelector = ({ gameType, selectedPiece, onPieceSelect, stage, placedPieces = {} }) => {
  const getPieceImage = (pieceType, isSelected) => {
    if (stage === 3) {
      // Stage 3 uses number pieces
      return `/src/assets/tiles/base/Numbers/${pieceType}.png`;
    } else {
      // Stages 1 and 2 use duck pieces
      const isPlaced = Object.values(placedPieces).some(piece => piece.type === pieceType);
      const pieceImages = {
        '1': {
          active: '/src/assets/tiles/ui/Duck1-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck1-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck1-select.png'
        },
        '2': {
          active: '/src/assets/tiles/ui/Duck2-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck2-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck2-select.png'
        },
        '3': {
          active: '/src/assets/tiles/ui/Duck3-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck3-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck3-select.png'
        },
        '4': {
          active: '/src/assets/tiles/ui/Duck4-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck4-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck4-select.png'
        },
        '5': {
          active: '/src/assets/tiles/ui/Duck5-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck5-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck5-select.png'
        },
        '6': {
          active: '/src/assets/tiles/ui/Duck6-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck6-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck6-select.png'
        },
        '7': {
          active: '/src/assets/tiles/ui/Duck7-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck7-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck7-select.png'
        },
        '8': {
          active: '/src/assets/tiles/ui/Duck8-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck8-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck8-select.png'
        },
        '9': {
          active: '/src/assets/tiles/ui/Duck9-select_active.png',
          inactive: '/src/assets/tiles/ui/Duck9-select_inactive.png',
          normal: '/src/assets/tiles/ui/Duck9-select.png'
        }
      };
      
      if (isPlaced) {
        return pieceImages[pieceType]?.inactive || `/src/assets/tiles/ui/Duck${pieceType}-select_inactive.png`;
      }
      return isSelected 
        ? pieceImages[pieceType]?.active || `/src/assets/tiles/ui/Duck${pieceType}-select_active.png`
        : pieceImages[pieceType]?.normal || `/src/assets/tiles/ui/Duck${pieceType}-select.png`;
    }
  };

  const getPieceExplanation = (pieceType) => {
    if (stage === 3) {
      return `This button lets you pick up, and later place, the number ${pieceType}.`;
    } else {
      const explanations = {
        '1': 'This button lets you pick up, and later place, Una.',
        '2': 'This button lets you pick up, and later place, Dux.',
        '3': 'This button lets you pick up, and later place, Trey.',
        '4': 'This button lets you pick up, and later place, Quacko.',
        '5': 'This button lets you pick up, and later place, Lima.',
        '6': 'This button lets you pick up, and later place, Hex.',
        '7': 'This button lets you pick up, and later place, Set.',
        '8': 'This button lets you pick up, and later place, Otto.',
        '9': 'This button lets you pick up, and later place, Tisa.'
      };
      return explanations[pieceType] || `This button lets you pick up, and later place, duck ${pieceType}.`;
    }
  };

  const pieces = gameType === '4x4' ? ['1', '2', '3', '4'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div style={{
      position: 'absolute',
      left: '-100px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {pieces.map(piece => {
        const isPlaced = Object.values(placedPieces).some(p => p.type === piece);
        return (
          <div key={piece} style={{ position: 'relative' }}>
            <button
              onClick={() => !isPlaced && onPieceSelect(piece === selectedPiece ? null : piece)}
              disabled={isPlaced}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: isPlaced ? 'default' : 'pointer',
                width: '60px',
                height: '60px',
                opacity: isPlaced ? 0.5 : 1
              }}
            >
              <img
                src={getPieceImage(piece, piece === selectedPiece)}
                alt={`Select ${piece}`}
                style={{ width: '100%', height: '100%' }}
              />
            </button>
            <div
              style={{
                position: 'absolute',
                left: '70px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '14px',
                maxWidth: '200px',
                display: 'none',
                zIndex: 1000
              }}
              className="piece-explanation"
            >
              {getPieceExplanation(piece)}
            </div>
          </div>
        );
      })}
      <style>
        {`
          .piece-explanation {
            opacity: 0;
            transition: opacity 0.2s;
          }
          button:hover + .piece-explanation {
            display: block;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default PieceSelector; 