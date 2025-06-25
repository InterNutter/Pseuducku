import React, { useState, useEffect } from 'react';
import ControlButtons from './ControlButtons';
import PieceSelector from './PieceSelector';
import { BOARD_LAYOUTS } from '../utils/boardLayouts';
import { generatePuzzle } from '../utils/puzzleGenerator';
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
// Pre-placed pieces
import sd1 from '../assets/tiles/base/Game Placed Pieces/SD1.png';
import sd2 from '../assets/tiles/base/Game Placed Pieces/SD2.png';
import sd3 from '../assets/tiles/base/Game Placed Pieces/SD3.png';
import sd4 from '../assets/tiles/base/Game Placed Pieces/SD4.png';
import sd5 from '../assets/tiles/base/Game Placed Pieces/SD5.png';
import sd6 from '../assets/tiles/base/Game Placed Pieces/SD6.png';
import sd7 from '../assets/tiles/base/Game Placed Pieces/SD7.png';
import sd8 from '../assets/tiles/base/Game Placed Pieces/SD8.png';
import sd9 from '../assets/tiles/base/Game Placed Pieces/SD9.png';
// Player pieces
import una from '../assets/tiles/base/Player Pieces/1-Una.png';
import dux from '../assets/tiles/base/Player Pieces/2-Dux.png';
import trey from '../assets/tiles/base/Player Pieces/3-Trey.png';
import quacko from '../assets/tiles/base/Player Pieces/4-Quacko.png';
import lima from '../assets/tiles/base/Player Pieces/5-Lima.png';
import hex from '../assets/tiles/base/Player Pieces/6-Hex.png';
import set from '../assets/tiles/base/Player Pieces/7-Set.png';
import otto from '../assets/tiles/base/Player Pieces/8-Otto.png';
import tisa from '../assets/tiles/base/Player Pieces/9-Tisa.png';
// Numbers
import number1 from '../assets/tiles/numbers/Number1.png';
import number2 from '../assets/tiles/numbers/Number2.png';
import number3 from '../assets/tiles/numbers/Number3.png';
import number4 from '../assets/tiles/numbers/Number4.png';
import number5 from '../assets/tiles/numbers/Number5.png';
import number6 from '../assets/tiles/numbers/Number6.png';
import number7 from '../assets/tiles/numbers/Number7.png';
import number8 from '../assets/tiles/numbers/Number8.png';
import number9 from '../assets/tiles/numbers/Number9.png';
import InfoPopup from './InfoPopup';
import HelpPopup from './HelpPopup';
import HintPopup from './HintPopup';
import RulerPopup from './RulerPopup';

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
  const [canNext, setCanNext] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [infoStep, setInfoStep] = useState(0);
  const [eraserMode, setEraserMode] = useState(false);
  const [hintMode, setHintMode] = useState(false);
  const [rulerMode, setRulerMode] = useState(false);

  const boardLayout = BOARD_LAYOUTS[gameType].layout;
  const gridSize = BOARD_LAYOUTS[gameType].cols;

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

  // Helper function to get the matching duck for a pre-placed piece
  const getMatchingDuck = (prePlacedType) => {
    for (const [duck, prePlaced] of Object.entries(duckMatching)) {
      if (prePlaced === prePlacedType) {
        return duck;
      }
    }
    return null;
  };

  // Info steps for sequential popup - dynamic based on stage
  const infoSteps = [
    {
      title: "Info Button",
      description: "This button shows information about all the other buttons. You can click through each button's explanation or close when you're done.",
      highlight: "info"
    },
    {
      title: "Help Button", 
      description: "This button shows the game instructions and rules. Click it to learn how to play the game.",
      highlight: "help"
    },
    {
      title: "Undo Button",
      description: "This button undoes your last move. You can undo all the way back to the starting condition. It's not available when you haven't made any moves yet.",
      highlight: "undo"
    },
    {
      title: "Erase Button",
      description: "This button removes your last placed piece. You cannot erase pre-placed pieces, and it's not available when you haven't placed any pieces yet.",
      highlight: "erase"
    },
    {
      title: "Hint Button",
      description: stage === 3 
        ? "This button shows where you can place your selected number. It highlights valid placement cells in green. Only works when you have a number selected."
        : "This button shows where you can place your selected duck. It highlights valid placement cells in green. Only works when you have a duck selected.",
      highlight: "hint"
    },
    {
      title: "Ruler Button",
      description: stage === 3
        ? "This button shows lines where your selected number cannot be placed. It highlights restricted cells in red. Only works when you have a number selected."
        : "This button shows lines where your selected duck cannot be placed. It highlights restricted cells in red. Only works when you have a duck selected.",
      highlight: "ruler"
    },
    {
      title: "Previous Button",
      description: "This button lets you go to the previous puzzle in the series. It's not available when you're viewing the first puzzle.",
      highlight: "previous"
    },
    {
      title: "Next Button",
      description: "This button lets you go to the next puzzle in the series. You can always move forward to the next puzzle.",
      highlight: "next"
    },
    {
      title: stage === 3 ? "Number Selection Buttons" : "Duck Selection Buttons",
      description: stage === 3
        ? "These buttons let you select which number you want to place on the board. Click a number button to pick it up, then click on an empty tile to place it. The buttons show active/inactive states based on whether you can place more of that number type."
        : "These buttons let you select which duck you want to place on the board. Click a duck button to pick it up, then click on an empty tile to place it. The buttons show active/inactive states based on whether you can place more of that duck type.",
      highlight: "piece-selector"
    }
  ];

  // Generate a new puzzle when the component mounts or gameType changes
  useEffect(() => {
    if (gameType === '4x4' || gameType === '9x9') {
      const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType);
      console.log('Setting pre-placed pieces:', newPrePlacedPieces);
      console.log('Pre-placed pieces keys:', Object.keys(newPrePlacedPieces));
      setPrePlacedPieces(newPrePlacedPieces);
      setPlacedPieces({});
      setMoveHistory([]);
      setCanUndo(false);
      setCanErase(false);
    }
  }, [gameType]);

  // Update button states based on game state
  useEffect(() => {
    setCanUndo(moveHistory.length > 0);
    setCanErase(Object.keys(placedPieces).length > 0 || eraserMode);
    setCanHint(selectedPiece !== null && !eraserMode);
    setCanRuler(selectedPiece !== null && !eraserMode);
    setCanPrevious(currentPuzzleIndex > 0);
  }, [moveHistory.length, placedPieces, selectedPiece, eraserMode, currentPuzzleIndex]);

  const handleCellClick = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    const placedPiece = placedPieces[cellKey];
    const prePlacedPiece = prePlacedPieces[cellKey];
    
    console.log('=== CELL CLICK DEBUG ===');
    console.log('Clicked cell:', cellKey);
    console.log('Selected piece:', selectedPiece);
    console.log('Pre-placed piece in cell:', prePlacedPiece);
    console.log('Placed piece in cell:', placedPiece);
    
    // Handle eraser mode
    if (eraserMode) {
      console.log('In eraser mode');
      if (placedPiece && !prePlacedPiece) {
        // Remove the placed piece
        setPlacedPieces(prev => {
          const newPieces = { ...prev };
          delete newPieces[cellKey];
          return newPieces;
        });
        // Update move history to remove this move
        setMoveHistory(prev => prev.filter(move => move.cellKey !== cellKey));
        return;
      }
      return; // Don't do anything else in eraser mode
    }
    
    // Normal piece placement logic
    if (!selectedPiece) {
      console.log('No piece selected');
      return;
    }
    
    // Don't allow placing pieces on pre-placed pieces
    if (prePlacedPieces[cellKey]) {
      console.log('Cannot place on pre-placed piece');
      return;
    }

    // Use the duck matching validation logic
    const canPlace = canPlacePieceAt(rowIndex, colIndex, selectedPiece);
    console.log('canPlacePieceAt returned:', canPlace);
    
    if (!canPlace) {
      console.log('Validation failed - not placing piece');
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
    
    // Update move history
    setMoveHistory(prev => [...prev, { cellKey, pieceType: selectedPiece }]);
    
    // Only clear the selected piece if we've placed the maximum number of this type
    const maxPieces = gameType === '4x4' ? 4 : 9;
    const pieceCount = Object.values(placedPieces).filter(p => p.type === selectedPiece).length;
    const newPieceCount = pieceCount + 1;
    if (newPieceCount >= maxPieces) {
      setSelectedPiece(null);
    }
    console.log('=== END CELL CLICK DEBUG ===');
  };

  const getPieceImagePath = (pieceType, isPrePlaced) => {
    if (stage === 3) {
      // Numbers
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
    }
    
    if (isPrePlaced) {
      // Pre-placed pieces
      const prePlacedImages = {
        'SD1': sd1,
        'SD2': sd2,
        'SD3': sd3,
        'SD4': sd4,
        'SD5': sd5,
        'SD6': sd6,
        'SD7': sd7,
        'SD8': sd8,
        'SD9': sd9
      };
      return prePlacedImages[pieceType];
    }
    
    // Player pieces
    const playerImages = {
      '1-Una': una,
      '2-Dux': dux,
      '3-Trey': trey,
      '4-Quacko': quacko,
      '5-Lima': lima,
      '6-Hex': hex,
      '7-Set': set,
      '8-Otto': otto,
      '9-Tisa': tisa
    };
    return playerImages[pieceType];
  };

  // Button handlers
  const handleInfo = () => {
    setShowInfo(!showInfo);
    setInfoStep(0);
    setShowHelp(false);
    setShowHint(false);
    setShowRuler(false);
  };

  const handleHelp = () => {
    setShowHelp(!showHelp);
    setShowInfo(false);
    setShowHint(false);
    setShowRuler(false);
  };

  const handleUndo = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1];
      setPlacedPieces(prev => {
        const newPieces = { ...prev };
        delete newPieces[lastMove.cellKey];
        return newPieces;
      });
      setMoveHistory(prev => prev.slice(0, -1));
      setSelectedPiece(lastMove.pieceType);
    }
  };

  const handleErase = () => {
    setEraserMode(!eraserMode);
    // Clear selected piece when entering eraser mode
    if (!eraserMode) {
      setSelectedPiece(null);
    }
  };

  const handleHint = () => {
    if (selectedPiece) {
      setHintMode(!hintMode);
      setShowHint(false);
      setShowInfo(false);
      setShowHelp(false);
      setShowRuler(false);
    }
  };

  const handleRuler = () => {
    if (selectedPiece) {
      setRulerMode(!rulerMode);
      setShowRuler(false);
      setShowInfo(false);
      setShowHelp(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(prev => prev - 1);
      // Generate new puzzle
      const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType);
      setPrePlacedPieces(newPrePlacedPieces);
      setPlacedPieces({});
      setMoveHistory([]);
      setSelectedPiece(null);
      setEraserMode(false);
      setHintMode(false);
      setRulerMode(false);
    }
  };

  const handleNext = () => {
    setCurrentPuzzleIndex(prev => prev + 1);
    // Generate new puzzle
    const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType);
    setPrePlacedPieces(newPrePlacedPieces);
    setPlacedPieces({});
    setMoveHistory([]);
    setSelectedPiece(null);
    setEraserMode(false);
    setHintMode(false);
    setRulerMode(false);
  };

  // Info navigation functions
  const handleNextInfo = () => {
    if (infoStep < infoSteps.length - 1) {
      setInfoStep(infoStep + 1);
    }
  };

  const handlePreviousInfo = () => {
    if (infoStep > 0) {
      setInfoStep(infoStep - 1);
    }
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    setInfoStep(0);
  };

  // Helper function to check if a piece can be placed at a specific location
  const canPlacePieceAt = (rowIndex, colIndex, pieceType) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    
    // Check if cell is already occupied
    if (placedPieces[cellKey] || prePlacedPieces[cellKey]) {
      return false;
    }
    
    // Check if this cell is within the actual game grid
    const gameStart = 2; // Game starts at row/column 2
    const gameEnd = gameType === '4x4' ? 5 : 10; // Game ends at row/column 5 (4x4) or 10 (9x9)
    
    if (rowIndex < gameStart || rowIndex > gameEnd || colIndex < gameStart || colIndex > gameEnd) {
      return false; // Outside the game grid
    }
    
    // Get the matching pre-placed piece for this duck
    const matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    if (!matchingPrePlacedPiece) {
      return false; // Invalid duck type
    }
    
    // Check if this would violate the duck matching rules
    // A duck cannot be placed in the same row, column, or cell as its matching pre-placed piece
    
    // Check if this specific cell contains the matching pre-placed piece
    const currentCellPrePlaced = prePlacedPieces[cellKey];
    if (currentCellPrePlaced && currentCellPrePlaced.type === matchingPrePlacedPiece) {
      return false; // Cannot place duck in the same cell as its matching pre-placed piece
    }
    
    // Check row - see if the matching pre-placed piece is in the same row
    for (let c = gameStart; c <= gameEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place duck in same row as its matching pre-placed piece
      }
    }
    
    // Check column - see if the matching pre-placed piece is in the same column
    for (let r = gameStart; r <= gameEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place duck in same column as its matching pre-placed piece
      }
    }
    
    // Check cell (box/pen) - Sudoku constraint
    // For 4x4: cells are 2x2, for 9x9: cells are 3x3
    const cellSize = gameType === '4x4' ? 2 : 3;
    const cellRow = Math.floor((rowIndex - gameStart) / cellSize);
    const cellCol = Math.floor((colIndex - gameStart) / cellSize);
    
    // Check all tiles in the same cell
    for (let r = gameStart + cellRow * cellSize; r < gameStart + (cellRow + 1) * cellSize; r++) {
      for (let c = gameStart + cellCol * cellSize; c < gameStart + (cellCol + 1) * cellSize; c++) {
        const checkCellKey = `${r}-${c}`;
        const prePlacedPiece = prePlacedPieces[checkCellKey];
        
        if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
          return false; // Cannot place duck in same cell (box) as its matching pre-placed piece
        }
      }
    }
    
    // Check if we haven't placed the maximum number of this duck type
    const maxPieces = gameType === '4x4' ? 4 : 9;
    const pieceCount = Object.values(placedPieces).filter(p => p.type === pieceType).length;
    return pieceCount < maxPieces;
  };

  // Helper function to check if a cell should be highlighted for ruler mode
  const isRulerHighlighted = (rowIndex, colIndex, pieceType) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    
    // Don't highlight occupied cells
    if (placedPieces[cellKey] || prePlacedPieces[cellKey]) {
      return false;
    }
    
    // Check if this cell is within the actual game grid
    const gameStart = 2; // Game starts at row/column 2
    const gameEnd = gameType === '4x4' ? 5 : 10; // Game ends at row/column 5 (4x4) or 10 (9x9)
    
    if (rowIndex < gameStart || rowIndex > gameEnd || colIndex < gameStart || colIndex > gameEnd) {
      return false; // Outside the game grid
    }
    
    // Get the matching pre-placed piece for this duck
    const matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    if (!matchingPrePlacedPiece) {
      return false; // Invalid duck type
    }
    
    // Check if this cell would violate the duck matching rules
    // A duck cannot be placed in the same row, column, or cell as its matching pre-placed piece
    
    // Check row - see if the matching pre-placed piece is in the same row
    for (let c = gameStart; c <= gameEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return true; // This cell is in the same row as the matching pre-placed piece
      }
    }
    
    // Check column - see if the matching pre-placed piece is in the same column
    for (let r = gameStart; r <= gameEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return true; // This cell is in the same column as the matching pre-placed piece
      }
    }
    
    return false;
  };

  // RulerLines component: draws thick red lines across rows/columns for the selected piece
  const RulerLines = ({ selectedPiece, prePlacedPieces, placedPieces, gameType }) => {
    if (!selectedPiece) return null;

    // Get the matching pre-placed piece for the selected duck
    const getMatchingPrePlacedPiece = (duckType) => {
      const duckNumber = duckType.split('-')[0];
      return `SD${duckNumber}`;
    };

    const matchingPrePlacedPiece = getMatchingPrePlacedPiece(selectedPiece);
    if (!matchingPrePlacedPiece) return null;

    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    const cellSize = gameType === '4x4' ? 2 : 3;

    // Find all positions of the matching pre-placed piece and placed ducks of the same type
    const restrictedPositions = [];
    
    // Check pre-placed pieces
    Object.entries(prePlacedPieces).forEach(([key, piece]) => {
      if (piece.type === matchingPrePlacedPiece) {
        const [row, col] = key.split('-').map(Number);
        // Only include positions within the game grid
        if (row >= gameStart && row <= gameEnd && col >= gameStart && col <= gameEnd) {
          restrictedPositions.push({ row, col });
        }
      }
    });
    
    // Check placed pieces
    Object.entries(placedPieces).forEach(([key, piece]) => {
      if (piece.type === selectedPiece) {
        const [row, col] = key.split('-').map(Number);
        // Only include positions within the game grid
        if (row >= gameStart && row <= gameEnd && col >= gameStart && col <= gameEnd) {
          restrictedPositions.push({ row, col });
        }
      }
    });

    if (restrictedPositions.length === 0) return null;

    // Calculate which rows and columns are restricted
    const restrictedRows = new Set();
    const restrictedCols = new Set();
    const restrictedCells = new Set();

    restrictedPositions.forEach(({ row, col }) => {
      restrictedRows.add(row);
      restrictedCols.add(col);
      
      // Calculate which cell this position is in
      const cellRow = Math.floor((row - gameStart) / cellSize);
      const cellCol = Math.floor((col - gameStart) / cellSize);
      restrictedCells.add(`${cellRow}-${cellCol}`);
    });

    return (
      <>
        {/* Horizontal lines for restricted rows */}
        {Array.from(restrictedRows).map((row) => {
          const y = (row - gameStart) * 50 + 25; // Add 25px to center in tile
          return (
            <div
              key={`row-${row}`}
              style={{
                position: 'absolute',
                left: '100px', // 2 columns * 50px = 100px
                top: `${100 + y}px`, // 2 rows * 50px = 100px + row offset
                width: gameType === '4x4' ? '200px' : '450px', // 4*50 for 4x4, 9*50 for 9x9 (columns 2-10)
                height: '5px',
                backgroundColor: 'red',
                zIndex: 11,
              }}
            />
          );
        })}

        {/* Vertical lines for restricted columns */}
        {Array.from(restrictedCols).map((col) => {
          const x = (col - gameStart) * 50 + 25; // Add 25px to center in tile
          return (
            <div
              key={`col-${col}`}
              style={{
                position: 'absolute',
                left: `${100 + x}px`, // 2 columns * 50px = 100px + col offset
                top: '100px', // 2 rows * 50px = 100px
                width: '5px',
                height: gameType === '4x4' ? '200px' : '450px', // 4*50 for 4x4, 9*50 for 9x9 (rows 2-10)
                backgroundColor: 'red',
                zIndex: 11,
              }}
            />
          );
        })}
      </>
    );
  };

  // Helper function to check if a cell is valid for hint highlighting
  const isValidForHint = (rowIndex, colIndex, pieceType) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    
    // Check if cell is already occupied
    if (placedPieces[cellKey] || prePlacedPieces[cellKey]) {
      return false;
    }
    
    // Check if this cell is within the actual game grid
    const gameStart = 2; // Game starts at row/column 2
    const gameEnd = gameType === '4x4' ? 5 : 10; // Game ends at row/column 5 (4x4) or 10 (9x9)
    
    if (rowIndex < gameStart || rowIndex > gameEnd || colIndex < gameStart || colIndex > gameEnd) {
      return false; // Outside the game grid
    }
    
    // Get the matching pre-placed piece for this duck
    const matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    if (!matchingPrePlacedPiece) {
      return false; // Invalid duck type
    }
    
    // Check row - see if the matching pre-placed piece OR the same duck type is in the same row
    for (let c = gameStart; c <= gameEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      const placedPiece = placedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place duck in same row as its matching pre-placed piece
      }
      
      if (placedPiece && placedPiece.type === pieceType) {
        return false; // Cannot place duck in same row as another duck of the same type
      }
    }
    
    // Check column - see if the matching pre-placed piece OR the same duck type is in the same column
    for (let r = gameStart; r <= gameEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      const placedPiece = placedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place duck in same column as its matching pre-placed piece
      }
      
      if (placedPiece && placedPiece.type === pieceType) {
        return false; // Cannot place duck in same column as another duck of the same type
      }
    }
    
    // Check cell (box/pen) - Sudoku constraint
    // For 4x4: cells are 2x2, for 9x9: cells are 3x3
    const cellSize = gameType === '4x4' ? 2 : 3;
    const cellRow = Math.floor((rowIndex - gameStart) / cellSize);
    const cellCol = Math.floor((colIndex - gameStart) / cellSize);
    
    // Check all tiles in the same cell
    for (let r = gameStart + cellRow * cellSize; r < gameStart + (cellRow + 1) * cellSize; r++) {
      for (let c = gameStart + cellCol * cellSize; c < gameStart + (cellCol + 1) * cellSize; c++) {
        const checkCellKey = `${r}-${c}`;
        const prePlacedPiece = prePlacedPieces[checkCellKey];
        const placedPiece = placedPieces[checkCellKey];
        
        if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
          return false; // Cannot place duck in same cell (box) as its matching pre-placed piece
        }
        
        if (placedPiece && placedPiece.type === pieceType) {
          return false; // Cannot place duck in same cell (box) as another duck of the same type
        }
      }
    }
    
    return true;
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
              
              // Check if this cell should be highlighted for hint or ruler
              const isHintCell = hintMode && selectedPiece && isValidForHint(rowIndex, colIndex, selectedPiece);
              const isRulerCell = false; // Ruler mode only shows lines, not cell highlights
              
              return (
                <div
                  key={cellKey}
                  className={`board-cell ${isHintCell ? 'hint-cell' : ''} ${isRulerCell ? 'ruler-cell' : ''}`}
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
          
          {/* Ruler lines overlay - positioned within the game board grid */}
          {rulerMode && selectedPiece && (
            <RulerLines
              selectedPiece={selectedPiece}
              prePlacedPieces={prePlacedPieces}
              placedPieces={placedPieces}
              gameType={gameType}
            />
          )}
          
          <div className="piece-selector-row">
            <PieceSelector
              gameType={gameType}
              selectedPiece={selectedPiece}
              onPieceSelect={setSelectedPiece}
              stage={stage}
              placedPieces={placedPieces}
              prePlacedPieces={prePlacedPieces}
              highlightedButton={showInfo ? infoSteps[infoStep].highlight : null}
            />
          </div>
          <div className="ui-button-column">
            <ControlButtons
              onInfo={handleInfo}
              onHelp={handleHelp}
              onUndo={handleUndo}
              onErase={handleErase}
              onHint={handleHint}
              onRuler={handleRuler}
              onPrevious={handlePrevious}
              onNext={handleNext}
              canUndo={canUndo}
              canErase={canErase}
              canHint={canHint}
              canRuler={canRuler}
              canNavigate={true}
              hasPreviousPuzzle={canPrevious}
              hasNextPuzzle={canNext}
              highlightedButton={showInfo ? infoSteps[infoStep].highlight : null}
              eraserMode={eraserMode}
              hintMode={hintMode}
              rulerMode={rulerMode}
            />
          </div>
        </div>
      </div>
      
      {/* Info Popup */}
      {showInfo && (
        <div className="info-popup">
          <div className="popup-content">
            <h3>{infoSteps[infoStep].title}</h3>
            <div className="info-description">
              {infoSteps[infoStep].description}
            </div>
            <div className="info-navigation">
              <button 
                onClick={handlePreviousInfo}
                disabled={infoStep === 0}
                className="nav-button prev-button"
              >
                Previous
              </button>
              <span className="info-counter">
                {infoStep + 1} of {infoSteps.length}
              </span>
              <button 
                onClick={handleNextInfo}
                disabled={infoStep === infoSteps.length - 1}
                className="nav-button next-button"
              >
                Next
              </button>
            </div>
            <button onClick={handleCloseInfo} className="close-button">
              I'm Done
            </button>
          </div>
        </div>
      )}
      
      {/* Help Popup */}
      {showHelp && (
        <div className="help-popup">
          <div className="popup-content">
            <h3>How to Play</h3>
            <p><strong>Objective:</strong> Place {stage === 3 ? 'numbers' : 'ducks'} on the board so that no two of the same type appear in the same row, column, or pen.</p>
            <p><strong>Gameplay:</strong></p>
            <ul>
              <li>Click a {stage === 3 ? 'number' : 'duck'} button to select it</li>
              <li>Click on an empty tile to place the selected {stage === 3 ? 'number' : 'duck'}</li>
              <li>You cannot place the same {stage === 3 ? 'number' : 'duck'} type in the same row or column</li>
              <li>You cannot place the same {stage === 3 ? 'number' : 'duck'} type in the same pen (the bordered areas on the board)</li>
              <li>Pre-placed pieces cannot be moved or removed</li>
              <li>Use the hint and ruler buttons to help you solve the puzzle</li>
            </ul>
            <button onClick={() => setShowHelp(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard; 