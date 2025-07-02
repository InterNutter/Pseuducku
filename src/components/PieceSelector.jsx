import React from 'react';
import soundManager from '../utils/soundManager';
import stage3Manager from '../utils/stage3Manager';

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

// Import number images for Stage 3
import number1 from '../assets/tiles/numbers/Number1.png';
import number2 from '../assets/tiles/numbers/Number2.png';
import number3 from '../assets/tiles/numbers/Number3.png';
import number4 from '../assets/tiles/numbers/Number4.png';
import number5 from '../assets/tiles/numbers/Number5.png';
import number6 from '../assets/tiles/numbers/Number6.png';
import number7 from '../assets/tiles/numbers/Number7.png';
import number8 from '../assets/tiles/numbers/Number8.png';
import number9 from '../assets/tiles/numbers/Number9.png';

const PieceSelector = ({ gameType, selectedPiece, onPieceSelect, stage, placedPieces = {}, prePlacedPieces = {}, highlightedButton }) => {
  // Duck matching system: maps each duck to its corresponding pre-placed piece
  const duckMatching = {
    '1-Una': 'SD1',
    '2-Dux': 'SD2', 
    '3-Trey': 'SD3',
    '4-Quacko': 'SD4',
    '5-Lima': 'SD5',
    '6-Hex': 'SD6',
    '7-Set': 'SD7',
    '8-Otto': 'SD8',
    '9-Tisa': 'SD9'
  };

  // Helper function to get the matching pre-placed piece for a duck
  const getMatchingPrePlacedPiece = (duckType) => {
    return duckMatching[duckType];
  };

  // Function to check if a piece type can be placed anywhere using duck matching logic
  const canPlacePiece = (pieceType) => {
    // First check if we've already placed the maximum number of this piece type
    // Count both pre-placed pieces and player-placed pieces
    const maxPieces = gameType === '4x4' ? 4 : 9;
    
    // Count player-placed pieces of this type
    const playerPlacedCount = Object.values(placedPieces).filter(p => p.type === pieceType).length;
    
    // Count pre-placed pieces that match this piece type
    let matchingPrePlacedPiece;
    if (stage === 3) {
      matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(pieceType);
    } else {
      matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    }
    const prePlacedCount = Object.values(prePlacedPieces).filter(p => p.type === matchingPrePlacedPiece).length;
    
    // Total count of this piece type (both pre-placed and player-placed)
    const totalCount = playerPlacedCount + prePlacedCount;
    
    if (totalCount >= maxPieces) {
      return false; // Already placed maximum number of this piece type
    }
    
    const validCells = gameType === '4x4' ? 
      ['2-2', '2-3', '2-4', '2-5', '3-2', '3-3', '3-4', '3-5', '4-2', '4-3', '4-4', '4-5', '5-2', '5-3', '5-4', '5-5'] :
      Array.from({length: 81}, (_, i) => {
        const row = Math.floor(i / 9) + 2;
        const col = (i % 9) + 2;
        return `${row}-${col}`;
      });
    
    // Check if there's any valid cell where this piece can be placed
    for (const cellKey of validCells) {
      const [row, col] = cellKey.split('-').map(Number);
      
      // Skip if cell is already occupied
      if (placedPieces[cellKey] || prePlacedPieces[cellKey]) {
        continue;
      }
      
      // Check if this would violate duck matching rules
      let canPlace = true;
      
      // Get the matching pre-placed piece for this piece
      let matchingPrePlacedPiece;
      if (stage === 3) {
        matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(pieceType);
      } else {
        matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
      }
      if (!matchingPrePlacedPiece) {
        continue; // Invalid piece type
      }
      
      // Check row - see if the matching pre-placed piece is in the same row
      const gameStart = 2;
      const gameEnd = gameType === '4x4' ? 5 : 10;
      
      for (let c = gameStart; c <= gameEnd; c++) {
        const checkCellKey = `${row}-${c}`;
        const prePlacedPiece = prePlacedPieces[checkCellKey];
        
        if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
          canPlace = false;
          break;
        }
      }
      
      if (!canPlace) continue;
      
      // Check column - see if the matching pre-placed piece is in the same column
      for (let r = gameStart; r <= gameEnd; r++) {
        const checkCellKey = `${r}-${col}`;
        const prePlacedPiece = prePlacedPieces[checkCellKey];
        
        if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
          canPlace = false;
          break;
        }
      }
      
      if (canPlace) {
        return true; // Found a valid placement
      }
    }
    
    return false; // No valid placement found
  };

  const getPieceImage = (pieceType, isSelected) => {
    if (stage === 3) {
      // Stage 3 uses mixed duck and number pieces
      if (stage3Manager.isNumberPiece(pieceType)) {
        // Use number images for number pieces
        const numberImages = {
          '1': number1,
          '2': number2,
          '3': number3,
          '4': number4,
          '5': number5,
          '6': number6,
          '7': number7,
          '8': number8,
          '9': number9
        };
        return numberImages[pieceType];
      } else {
        // Use duck images for duck pieces
        const duckImages = {
          '1': duck1Active,
          '2': duck2Active,
          '3': duck3Active,
          '4': duck4Active,
          '5': duck5Active,
          '6': duck6Active,
          '7': duck7Active,
          '8': duck8Active,
          '9': duck9Active
        };
        
        const duckInactiveImages = {
          '1': duck1Inactive,
          '2': duck2Inactive,
          '3': duck3Inactive,
          '4': duck4Inactive,
          '5': duck5Inactive,
          '6': duck6Inactive,
          '7': duck7Inactive,
          '8': duck8Inactive,
          '9': duck9Inactive
        };
        
        // Check if we can place more of this piece type
        const canPlace = canPlacePiece(pieceType);
        
        if (!canPlace) {
          return duckInactiveImages[pieceType];
        }
        return duckImages[pieceType];
      }
    } else {
      // Stages 1 and 2 use duck pieces
      const pieceImages = {
        '1-Una': {
          active: duck1Active,
          inactive: duck1Inactive,
          normal: duck1Active
        },
        '2-Dux': {
          active: duck2Active,
          inactive: duck2Inactive,
          normal: duck2Active
        },
        '3-Trey': {
          active: duck3Active,
          inactive: duck3Inactive,
          normal: duck3Active
        },
        '4-Quacko': {
          active: duck4Active,
          inactive: duck4Inactive,
          normal: duck4Active
        },
        '5-Lima': {
          active: duck5Active,
          inactive: duck5Inactive,
          normal: duck5Active
        },
        '6-Hex': {
          active: duck6Active,
          inactive: duck6Inactive,
          normal: duck6Active
        },
        '7-Set': {
          active: duck7Active,
          inactive: duck7Inactive,
          normal: duck7Active
        },
        '8-Otto': {
          active: duck8Active,
          inactive: duck8Inactive,
          normal: duck8Active
        },
        '9-Tisa': {
          active: duck9Active,
          inactive: duck9Inactive,
          normal: duck9Active
        }
      };
      
      // Check if we can place more of this piece type
      const canPlace = canPlacePiece(pieceType);
      
      if (!canPlace) {
        return pieceImages[pieceType]?.inactive;
      }
      return isSelected 
        ? pieceImages[pieceType]?.active
        : pieceImages[pieceType]?.normal;
    }
  };

  const getPieceExplanation = (pieceType) => {
    if (stage === 3) {
      if (stage3Manager.isNumberPiece(pieceType)) {
        return `This button lets you pick up, and later place, the number ${pieceType}.`;
      } else {
        const duckNames = {
          '1': 'Una',
          '2': 'Dux',
          '3': 'Trey',
          '4': 'Quacko',
          '5': 'Lima',
          '6': 'Hex',
          '7': 'Set',
          '8': 'Otto',
          '9': 'Tisa'
        };
        return `This button lets you pick up, and later place, ${duckNames[pieceType]}.`;
      }
    } else {
      const explanations = {
        '1-Una': 'This button lets you pick up, and later place, Una.',
        '2-Dux': 'This button lets you pick up, and later place, Dux.',
        '3-Trey': 'This button lets you pick up, and later place, Trey.',
        '4-Quacko': 'This button lets you pick up, and later place, Quacko.',
        '5-Lima': 'This button lets you pick up, and later place, Lima.',
        '6-Hex': 'This button lets you pick up, and later place, Hex.',
        '7-Set': 'This button lets you pick up, and later place, Set.',
        '8-Otto': 'This button lets you pick up, and later place, Otto.',
        '9-Tisa': 'This button lets you pick up, and later place, Tisa.'
      };
      return explanations[pieceType] || `This button lets you pick up, and later place, ${pieceType}.`;
    }
  };

  // Get pieces based on stage and game type
  const getPieces = () => {
    if (stage === 3) {
      // Stage 3 uses all 9 pieces (mixed ducks and numbers)
      const pieces = stage3Manager.getAllPieces();
      return pieces;
    } else {
      // Stages 1 and 2 use duck pieces
      return gameType === '4x4' ? ['1-Una', '2-Dux', '3-Trey', '4-Quacko'] : ['1-Una', '2-Dux', '3-Trey', '4-Quacko', '5-Lima', '6-Hex', '7-Set', '8-Otto', '9-Tisa'];
    }
  };

  const pieces = getPieces();
  
  console.log(`Rendering ${pieces.length} pieces for stage ${stage}:`, pieces);

  return (
    <div className="piece-selector">
      {pieces.map(piece => {
        const canPlace = canPlacePiece(piece);
        const isHighlighted = highlightedButton === piece || highlightedButton === "piece-selector";
        
        // Debug logging for highlighted button
        if (isHighlighted) {
          console.log('Highlighted button:', piece, 'canPlace:', canPlace, 'isDisabled:', !canPlace);
        }
        
        return (
          <div key={piece} className="piece-container">
            <button
              onClick={() => {
                console.log('Button clicked:', piece, 'isDisabled:', !canPlace);
                if (canPlace) {
                  soundManager.playButtonClick();
                  onPieceSelect(piece === selectedPiece ? null : piece);
                } else {
                  console.log('Button is disabled, cannot select:', piece);
                }
              }}
              disabled={!canPlace}
              className={`piece-button ${piece === selectedPiece ? 'selected' : ''} ${!canPlace ? 'disabled' : ''} ${isHighlighted ? 'button-highlight' : ''}`}
            >
              <img
                src={getPieceImage(piece, piece === selectedPiece)}
                alt={`Select ${piece}`}
                onError={(e) => {
                  console.error(`Failed to load piece image for ${piece}:`, e.target.src);
                }}
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