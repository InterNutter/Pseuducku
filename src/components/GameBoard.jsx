import React, { useState, useCallback } from 'react';
import { BOARD_LAYOUTS } from '../utils/boardLayouts';
import ControlButtons from './ControlButtons';
import PieceSelector from './PieceSelector';
import InfoPopup from './InfoPopup';
import HelpPopup from './HelpPopup';
import HintPopup from './HintPopup';
import RulerPopup from './RulerPopup';

const GameBoard = ({ gameType = '4x4', stage = 1, initialPieces = {}, hasPreviousPuzzle = false, hasNextPuzzle = false }) => {
  const boardLayout = BOARD_LAYOUTS[gameType];
  
  // Define playable areas for each game type
  const playableAreas = {
    '4x4': {
      startRow: 3,
      endRow: 6,
      startCol: 3,
      endCol: 6
    },
    '9x9': {
      startRow: 3,
      endRow: 11,
      startCol: 3,
      endCol: 11
    }
  };

  // State to track placed pieces
  const [placedPieces, setPlacedPieces] = useState({});
  // State to track move history for undo
  const [moveHistory, setMoveHistory] = useState([]);
  // State to track if ruler is active
  const [rulerActive, setRulerActive] = useState(false);
  // State to track if hint is active
  const [hintActive, setHintActive] = useState(false);
  // State to track selected piece
  const [selectedPiece, setSelectedPiece] = useState(null);
  // State to track if info popup is visible
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  // State to track if help popup is visible
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  // State to track if erase mode is active
  const [eraseMode, setEraseMode] = useState(false);
  // State to track if hint popup is visible
  const [showHintPopup, setShowHintPopup] = useState(false);
  // State to track if ruler popup is visible
  const [showRulerPopup, setShowRulerPopup] = useState(false);

  const isPlayableCell = (rowIndex, colIndex) => {
    const area = playableAreas[gameType];
    return rowIndex >= area.startRow && 
           rowIndex <= area.endRow && 
           colIndex >= area.startCol && 
           colIndex <= area.endCol;
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (isPlayableCell(rowIndex, colIndex)) {
      const cellKey = `${rowIndex}-${colIndex}`;
      
      // Don't allow placing pieces on cells with initial pieces
      if (initialPieces[cellKey]) return;

      if (eraseMode) {
        // If in erase mode and there's a piece, remove it
        if (placedPieces[cellKey]) {
          const removedPiece = placedPieces[cellKey];
          setPlacedPieces(prev => {
            const newPieces = { ...prev };
            delete newPieces[cellKey];
            return newPieces;
          });
          // Add to move history
          setMoveHistory(prev => [...prev, { 
            type: 'remove', 
            cellKey,
            piece: removedPiece.type 
          }]);
          // Exit erase mode after erasing a piece
          setEraseMode(false);
        }
      } else {
        // Normal piece placement logic
        if (placedPieces[cellKey]) {
          const removedPiece = placedPieces[cellKey];
          setPlacedPieces(prev => {
            const newPieces = { ...prev };
            delete newPieces[cellKey];
            return newPieces;
          });
          // Add to move history
          setMoveHistory(prev => [...prev, { 
            type: 'remove', 
            cellKey,
            piece: removedPiece.type 
          }]);
        } else if (selectedPiece) {
          // Place the selected piece
          setPlacedPieces(prev => ({
            ...prev,
            [cellKey]: {
              type: selectedPiece,
              // We'll add more properties as needed
            }
          }));
          // Add to move history
          setMoveHistory(prev => [...prev, { type: 'place', cellKey, piece: selectedPiece }]);
        }
      }
    }
  };

  const handlePieceSelect = useCallback((piece) => {
    setSelectedPiece(piece === selectedPiece ? null : piece);
    // Exit erase mode when selecting a piece
    if (eraseMode) {
      setEraseMode(false);
    }
  }, [selectedPiece, eraseMode]);

  // Control button handlers
  const handleInfo = useCallback(() => {
    setShowInfoPopup(true);
  }, []);

  const handleHelp = useCallback(() => {
    setShowHelpPopup(true);
  }, []);

  const handleUndo = useCallback(() => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1];
      setPlacedPieces(prev => {
        const newPieces = { ...prev };
        if (lastMove.type === 'place') {
          // Remove the piece that was placed
          delete newPieces[lastMove.cellKey];
        } else if (lastMove.type === 'remove') {
          // Restore the piece that was removed
          newPieces[lastMove.cellKey] = {
            type: lastMove.piece,
            // We'll add more properties as needed
          };
        }
        return newPieces;
      });
      setMoveHistory(prev => prev.slice(0, -1));
    }
  }, [moveHistory]);

  const handleErase = useCallback(() => {
    // Toggle erase mode
    setEraseMode(prev => !prev);
    // Clear selected piece when entering erase mode
    if (!eraseMode) {
      setSelectedPiece(null);
    }
  }, [eraseMode]);

  const handleHint = useCallback(() => {
    setShowHintPopup(true);
  }, []);

  const handleRuler = useCallback(() => {
    if (!selectedPiece) {
      setShowRulerPopup(true);
    } else {
      setRulerActive(prev => !prev);
    }
  }, [selectedPiece]);

  const handlePrevious = useCallback(() => {
    // TODO: Navigate to previous puzzle
    console.log('Previous button clicked');
  }, []);

  const handleNext = useCallback(() => {
    // TODO: Navigate to next puzzle
    console.log('Next button clicked');
  }, []);

  // Get the appropriate image path based on the stage and piece type
  const getPieceImagePath = (pieceType, isInitial = false) => {
    if (stage === 3) {
      // Stage 3 uses number pieces
      return `/src/assets/tiles/base/Numbers/${pieceType}.png`;
    } else {
      // Stages 1 and 2 use duck pieces
      return `/src/assets/tiles/base/${isInitial ? 'Game Placed Pieces' : 'Player Pieces'}/${pieceType}.png`;
    }
  };

  // Function to check if a placement is valid
  const isValidPlacement = useCallback((rowIndex, colIndex, pieceType) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    
    // Check if cell is playable and empty
    if (!isPlayableCell(rowIndex, colIndex) || initialPieces[cellKey] || placedPieces[cellKey]) {
      return false;
    }

    // Check row for duplicates
    for (let col = 0; col < boardLayout.cols; col++) {
      const checkKey = `${rowIndex}-${col}`;
      const placedPiece = placedPieces[checkKey];
      const initialPiece = initialPieces[checkKey];
      if ((placedPiece && placedPiece.type === pieceType) || 
          (initialPiece && initialPiece === pieceType)) {
        return false;
      }
    }

    // Check column for duplicates
    for (let row = 0; row < boardLayout.rows; row++) {
      const checkKey = `${row}-${colIndex}`;
      const placedPiece = placedPieces[checkKey];
      const initialPiece = initialPieces[checkKey];
      if ((placedPiece && placedPiece.type === pieceType) || 
          (initialPiece && initialPiece === pieceType)) {
        return false;
      }
    }

    // Check pen for duplicates
    const penStartRow = Math.floor(rowIndex / 2) * 2;
    const penStartCol = Math.floor(colIndex / 2) * 2;
    for (let row = penStartRow; row < penStartRow + 2; row++) {
      for (let col = penStartCol; col < penStartCol + 2; col++) {
        const checkKey = `${row}-${col}`;
        const placedPiece = placedPieces[checkKey];
        const initialPiece = initialPieces[checkKey];
        if ((placedPiece && placedPiece.type === pieceType) || 
            (initialPiece && initialPiece === pieceType)) {
          return false;
        }
      }
    }

    return true;
  }, [boardLayout, initialPieces, placedPieces]);

  // Function to find valid placements for a piece
  const findValidPlacements = useCallback((pieceType) => {
    const validSpots = [];
    for (let row = 0; row < boardLayout.rows; row++) {
      for (let col = 0; col < boardLayout.cols; col++) {
        if (isValidPlacement(row, col, pieceType)) {
          validSpots.push({ row, col });
        }
      }
    }
    return validSpots;
  }, [boardLayout, isValidPlacement]);

  // Function to check if a cell is in the same row/column as a piece of the same type
  const isRestrictedCell = useCallback((rowIndex, colIndex) => {
    if (!rulerActive || !selectedPiece) return false;

    // Check row for same type pieces
    for (let col = 0; col < boardLayout.cols; col++) {
      const checkKey = `${rowIndex}-${col}`;
      const placedPiece = placedPieces[checkKey];
      const initialPiece = initialPieces[checkKey];
      if ((placedPiece && placedPiece.type === selectedPiece) || 
          (initialPiece && initialPiece === selectedPiece)) {
        return true;
      }
    }

    // Check column for same type pieces
    for (let row = 0; row < boardLayout.rows; row++) {
      const checkKey = `${row}-${colIndex}`;
      const placedPiece = placedPieces[checkKey];
      const initialPiece = initialPieces[checkKey];
      if ((placedPiece && placedPiece.type === selectedPiece) || 
          (initialPiece && initialPiece === selectedPiece)) {
        return true;
      }
    }

    return false;
  }, [rulerActive, selectedPiece, boardLayout, placedPieces, initialPieces]);

  return (
    <div className="game-board" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${boardLayout.cols}, 1fr)`,
      gap: '0',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {boardLayout.layout.map((row, rowIndex) => (
        row.map((tile, colIndex) => {
          const cellKey = `${rowIndex}-${colIndex}`;
          const hasInitialPiece = initialPieces[cellKey];
          const hasPlacedPiece = placedPieces[cellKey];
          const isRestricted = isRestrictedCell(rowIndex, colIndex);

          return (
            <div
              key={cellKey}
              className={`board-tile ${isPlayableCell(rowIndex, colIndex) ? 'playable' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: '100%',
                aspectRatio: '1',
                backgroundImage: `url(/src/assets/tiles/base/Game Board/${tile})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: isPlayableCell(rowIndex, colIndex) && !hasInitialPiece ? 
                  (eraseMode ? 'crosshair' : 'pointer') : 'default',
                position: 'relative'
              }}
            >
              {isPlayableCell(rowIndex, colIndex) && !hasInitialPiece && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: '2px solid transparent',
                    transition: 'border-color 0.2s',
                    backgroundColor: isRestricted ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                    ':hover': {
                      borderColor: eraseMode ? '#ff4444' : '#4CAF50'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = eraseMode ? '#ff4444' : '#4CAF50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                />
              )}
              {hasInitialPiece && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(${getPieceImagePath(initialPieces[cellKey], true)})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
              {hasPlacedPiece && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(${getPieceImagePath(hasPlacedPiece.type)})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>
          );
        })
      ))}
      <ControlButtons
        onInfo={handleInfo}
        onHelp={handleHelp}
        onUndo={handleUndo}
        onErase={handleErase}
        onHint={handleHint}
        onRuler={handleRuler}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canUndo={moveHistory.length > 0}
        canErase={Object.keys(placedPieces).length > 0}
        canHint={true}
        canRuler={true}
        canNavigate={true}
        hasPreviousPuzzle={hasPreviousPuzzle}
        hasNextPuzzle={hasNextPuzzle}
      />
      <PieceSelector
        gameType={gameType}
        selectedPiece={selectedPiece}
        onPieceSelect={handlePieceSelect}
        stage={stage}
        placedPieces={placedPieces}
      />
      {showInfoPopup && <InfoPopup onClose={() => setShowInfoPopup(false)} />}
      {showHelpPopup && <HelpPopup onClose={() => setShowHelpPopup(false)} />}
      {showHintPopup && (
        <HintPopup 
          onClose={() => setShowHintPopup(false)}
          selectedPiece={selectedPiece}
          validPlacements={selectedPiece ? findValidPlacements(selectedPiece) : []}
        />
      )}
      {showRulerPopup && <RulerPopup onClose={() => setShowRulerPopup(false)} />}
    </div>
  );
};

export default GameBoard; 