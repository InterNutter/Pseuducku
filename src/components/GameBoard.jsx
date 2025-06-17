import React, { useState, useEffect } from 'react';
import ControlButtons from './ControlButtons';
import PieceSelector from './PieceSelector';
import { BOARD_LAYOUTS } from '../utils/boardLayouts';
import { generatePuzzle } from '../utils/puzzleGenerator';

// Import all tile images
import emptyTile from '../assets/tiles/base/Game Board/MT_empty.png';
import bottomMiddleSide from '../assets/tiles/base/Game Board/MT_bottom-middle-side.png';
import rightMiddleSide from '../assets/tiles/base/Game Board/MT_right-middle-side.png';
import leftMiddleSide from '../assets/tiles/base/Game Board/MT_left-middle-side.png';
import upperMiddleSide from '../assets/tiles/base/Game Board/MT_upper-middle-side.png';
// Outside corners (MT_corner-*.png)
import cornerUpperLeft from '../assets/tiles/base/Game Board/MT_corner-upper-left.png';
import cornerUpperRight from '../assets/tiles/base/Game Board/MT_corner-upper-right.png';
import cornerLowerLeft from '../assets/tiles/base/Game Board/MT_corner-lower-left.png';
import cornerLowerRight from '../assets/tiles/base/Game Board/MT_corner-lower-right.png';
// Inside corners (MT_*-corner.png)
import leftUpperCorner from '../assets/tiles/base/Game Board/MT_left-upper-corner.png';
import leftLowerCorner from '../assets/tiles/base/Game Board/MT_left-lower-corner.png';
import rightUpperCorner from '../assets/tiles/base/Game Board/MT_right-upper-corner.png';
import rightLowerCorner from '../assets/tiles/base/Game Board/MT_right-lower-corner.png';

const tileImages = {
  'MT_empty.png': emptyTile,
  'MT_bottom-middle-side.png': bottomMiddleSide,
  'MT_right-middle-side.png': rightMiddleSide,
  'MT_left-middle-side.png': leftMiddleSide,
  'MT_upper-middle-side.png': upperMiddleSide,
  // Outside corners (MT_corner-*.png)
  'MT_corner-upper-left.png': cornerUpperLeft,
  'MT_corner-upper-right.png': cornerUpperRight,
  'MT_corner-lower-left.png': cornerLowerLeft,
  'MT_corner-lower-right.png': cornerLowerRight,
  // Inside corners (MT_*-corner.png)
  'MT_left-upper-corner.png': leftUpperCorner,
  'MT_left-lower-corner.png': leftLowerCorner,
  'MT_right-upper-corner.png': rightUpperCorner,
  'MT_right-lower-corner.png': rightLowerCorner
};

const GameBoard = ({ gameType = '4x4', stage = 1 }) => {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedPieces, setPlacedPieces] = useState({});
  const [prePlacedPieces, setPrePlacedPieces] = useState({});
  const [canUndo, setCanUndo] = useState(false);
  const [canErase, setCanErase] = useState(false);
  const [canHint, setCanHint] = useState(false);
  const [canRuler, setCanRuler] = useState(false);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const boardLayout = BOARD_LAYOUTS[gameType].layout;
  const gridSize = BOARD_LAYOUTS[gameType].cols;

  // Generate a new puzzle when the component mounts or gameType changes
  useEffect(() => {
    if (gameType === '4x4' || gameType === '9x9') {
      const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType);
      console.log('Setting pre-placed pieces:', newPrePlacedPieces);
      console.log('Pre-placed pieces keys:', Object.keys(newPrePlacedPieces));
      setPrePlacedPieces(newPrePlacedPieces);
      setPlacedPieces({});
    }
  }, [gameType]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (!selectedPiece) return;
    
    const cellKey = `${rowIndex}-${colIndex}`;
    
    // Debug logging
    console.log('Cell clicked:', cellKey);
    console.log('Selected piece:', selectedPiece);
    console.log('Pre-placed pieces:', prePlacedPieces);
    console.log('Is cell pre-placed?', !!prePlacedPieces[cellKey]);
    
    // Don't allow placing pieces on pre-placed pieces
    if (prePlacedPieces[cellKey]) {
      console.log('Cannot place piece on pre-placed piece');
      return;
    }

    // Check if this would violate Sudoku rules (same number in same row/column)
    const maxPieces = gameType === '4x4' ? 4 : 9;
    
    // Check row - for 4x4, check the 4 cells in the same row; for 9x9, check the 9 cells
    const rowStart = gameType === '4x4' ? 2 : 2;
    const rowEnd = gameType === '4x4' ? 5 : 10;
    
    for (let c = rowStart; c <= rowEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const placedPiece = placedPieces[checkCellKey];
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if ((placedPiece && placedPiece.type === selectedPiece) || 
          (prePlacedPiece && prePlacedPiece.type === selectedPiece)) {
        console.log('Cannot place same number in same row');
        return;
      }
    }
    
    // Check column - for 4x4, check the 4 cells in the same column; for 9x9, check the 9 cells
    const colStart = gameType === '4x4' ? 2 : 2;
    const colEnd = gameType === '4x4' ? 5 : 10;
    
    for (let r = colStart; r <= colEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const placedPiece = placedPieces[checkCellKey];
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if ((placedPiece && placedPiece.type === selectedPiece) || 
          (prePlacedPiece && prePlacedPiece.type === selectedPiece)) {
        console.log('Cannot place same number in same column');
        return;
      }
    }

    // Count how many of this piece type are already placed
    const pieceCount = Object.values(placedPieces).filter(p => p.type === selectedPiece).length;
    if (pieceCount >= maxPieces) {
      console.log('Maximum number of this piece type already placed');
      return;
    }

    console.log('Placing piece:', selectedPiece, 'at:', cellKey);
    setPlacedPieces(prev => ({
      ...prev,
      [cellKey]: {
        type: selectedPiece,
        position: { row: rowIndex, col: colIndex }
      }
    }));
    
    // Only clear the selected piece if we've placed the maximum number of this type
    const newPieceCount = pieceCount + 1;
    if (newPieceCount >= maxPieces) {
      setSelectedPiece(null);
    }
  };

  const getPieceImagePath = (pieceType, isPrePlaced) => {
    if (stage === 3) {
      return `/src/assets/tiles/numbers/${pieceType}.png`;
    }
    
    if (isPrePlaced) {
      return `/src/assets/tiles/base/Game Placed Pieces/SD${pieceType}.png`;
    }
    
    const pieceNames = {
      '1': '1-Una.png',
      '2': '2-Dux.png',
      '3': '3-Trey.png',
      '4': '4-Quacko.png',
      '5': '5-Lima.png',
      '6': '6-Hex.png',
      '7': '7-Set.png',
      '8': '8-Otto.png',
      '9': '9-Tisa.png'
    };
    return `/src/assets/tiles/base/Player Pieces/${pieceNames[pieceType]}`;
  };

  return (
    <div className="game-container">
      <div className="game-board-container">
        <div className="game-board">
          {boardLayout.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              const placedPiece = placedPieces[cellKey];
              const prePlacedPiece = prePlacedPieces[cellKey];
              const tileImage = tileImages[cell];
              
              return (
                <div
                  key={cellKey}
                  className="board-cell"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <img
                    src={tileImage}
                    alt="Board tile"
                    className="board-tile"
                    onError={(e) => {
                      console.error(`Failed to load tile: ${cell}`);
                      e.target.style.display = 'none';
                    }}
                  />
                  {prePlacedPiece && !placedPieces[cellKey] && (
                    <img
                      src={getPieceImagePath(prePlacedPiece.type, true)}
                      alt={`Pre-placed piece ${prePlacedPiece.type}`}
                      className="placed-piece pre-placed"
                    />
                  )}
                  {placedPiece && (
                    <img
                      src={getPieceImagePath(placedPiece.type, false)}
                      alt={`Piece ${placedPiece.type}`}
                      className="placed-piece"
                    />
                  )}
                </div>
              );
            })
          ))}
          <div className="piece-selector-row">
            <PieceSelector
              gameType={gameType}
              selectedPiece={selectedPiece}
              onPieceSelect={setSelectedPiece}
              stage={stage}
              placedPieces={placedPieces}
              prePlacedPieces={prePlacedPieces}
            />
          </div>
          <div className="ui-button-column">
            <ControlButtons
              canUndo={canUndo}
              canErase={canErase}
              canHint={canHint}
              canRuler={canRuler}
              canPrevious={canPrevious}
              canNext={canNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard; 