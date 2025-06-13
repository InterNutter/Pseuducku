import React from 'react';

// Import all UI images
import duck1Active from '../assets/tiles/ui/Duck1-select_active.png';
import duck1Inactive from '../assets/tiles/ui/Duck1-select_inactive.png';
import duck2Active from '../assets/tiles/ui/Duck2-select_active.png';
import duck2Inactive from '../assets/tiles/ui/Duck2-select_inactive.png';
import duck3Active from '../assets/tiles/ui/Duck3-select_active.png';
import duck3Inactive from '../assets/tiles/ui/Duck3-select_inactive.png';
import duck4Active from '../assets/tiles/ui/Duck4-select_active.png';
import duck4Inactive from '../assets/tiles/ui/Duck4-select_inactive.png';
import duck5Active from '../assets/tiles/ui/Duck5-select_active.png';
import duck5Inactive from '../assets/tiles/ui/Duck5-select_inactive.png';
import duck6Active from '../assets/tiles/ui/Duck6-select_active.png';
import duck6Inactive from '../assets/tiles/ui/Duck6-select_inactive.png';
import duck7Active from '../assets/tiles/ui/Duck7-select_active.png';
import duck7Inactive from '../assets/tiles/ui/Duck7-select_inactive.png';
import duck8Active from '../assets/tiles/ui/Duck8-select_active.png';
import duck8Inactive from '../assets/tiles/ui/Duck8-select_inactive.png';
import duck9Active from '../assets/tiles/ui/Duck9-select_active.png';
import duck9Inactive from '../assets/tiles/ui/Duck9-select_inactive.png';

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
          active: duck1Active,
          inactive: duck1Inactive,
          normal: duck1Active
        },
        '2': {
          active: duck2Active,
          inactive: duck2Inactive,
          normal: duck2Active
        },
        '3': {
          active: duck3Active,
          inactive: duck3Inactive,
          normal: duck3Active
        },
        '4': {
          active: duck4Active,
          inactive: duck4Inactive,
          normal: duck4Active
        },
        '5': {
          active: duck5Active,
          inactive: duck5Inactive,
          normal: duck5Active
        },
        '6': {
          active: duck6Active,
          inactive: duck6Inactive,
          normal: duck6Active
        },
        '7': {
          active: duck7Active,
          inactive: duck7Inactive,
          normal: duck7Active
        },
        '8': {
          active: duck8Active,
          inactive: duck8Inactive,
          normal: duck8Active
        },
        '9': {
          active: duck9Active,
          inactive: duck9Inactive,
          normal: duck9Active
        }
      };
      
      if (isPlaced) {
        return pieceImages[pieceType]?.inactive;
      }
      return isSelected 
        ? pieceImages[pieceType]?.active
        : pieceImages[pieceType]?.normal;
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
    <div className="piece-selector">
      {pieces.map(piece => {
        const isPlaced = Object.values(placedPieces).some(p => p.type === piece);
        return (
          <div key={piece} className="piece-container">
            <button
              onClick={() => !isPlaced && onPieceSelect(piece === selectedPiece ? null : piece)}
              disabled={isPlaced}
              className={`piece-button ${piece === selectedPiece ? 'selected' : ''} ${isPlaced ? 'disabled' : ''}`}
            >
              <img
                src={getPieceImage(piece, piece === selectedPiece)}
                alt={`Select ${piece}`}
              />
            </button>
            <div className="piece-explanation">
              {getPieceExplanation(piece)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PieceSelector; 