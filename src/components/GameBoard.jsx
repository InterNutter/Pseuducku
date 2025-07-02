import React, { useState, useEffect } from 'react';
import ControlButtons from './ControlButtons';
import PieceSelector from './PieceSelector';
import MenuButton from './MenuButton';
import MenuPopup from './MenuPopup';
import { BOARD_LAYOUTS } from '../utils/boardLayouts';
import { generatePuzzle } from '../utils/puzzleGenerator';
import soundManager from '../utils/soundManager';
import stage3Manager from '../utils/stage3Manager';
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
import number1Placed from '../assets/tiles/numbers/Number1_placed_by_game.png';
import number2Placed from '../assets/tiles/numbers/Number2_placed_by_game.png';
import number3Placed from '../assets/tiles/numbers/Number3_placed_by_game.png';
import number4Placed from '../assets/tiles/numbers/Number4_placed_by_game.png';
import number5Placed from '../assets/tiles/numbers/Number5_placed_by_game.png';
import number6Placed from '../assets/tiles/numbers/Number6_placed_by_game.png';
import number7Placed from '../assets/tiles/numbers/Number7_placed_by_game.png';
import number8Placed from '../assets/tiles/numbers/Number8_placed_by_game.png';
import number9Placed from '../assets/tiles/numbers/Number9_placed_by_game.png';
import InfoPopup from './InfoPopup';
import HelpPopup from './HelpPopup';

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

const GameBoard = ({ gameType = '4x4', stage = 1, onStageChange }) => {
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
  const [eraserMode, setEraserMode] = useState(false);
  const [hintMode, setHintMode] = useState(false);
  const [rulerMode, setRulerMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');
  const [showTutorialWIPPopup, setShowTutorialWIPPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [showSupportPopup, setShowSupportPopup] = useState(false);
  const [highlightedInfoButton, setHighlightedInfoButton] = useState(null);

  const boardLayout = BOARD_LAYOUTS[gameType].layout;
  const gridSize = BOARD_LAYOUTS[gameType].cols;

  // Duck matching system: maps each duck to its corresponding pre-placed piece
  const getDuckMatching = () => {
    if (stage === 3) {
      // Stage 3 uses the Stage3Manager's duck matching system
      return stage3Manager.getDuckMatching();
    } else {
      // Stages 1 and 2 use traditional duck matching
      return {
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
    }
  };

  const duckMatching = getDuckMatching();

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



  // Generate a new puzzle when the component mounts or gameType or stage changes
  useEffect(() => {
    if (gameType === '4x4' || gameType === '9x9') {
      const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType, stage);
      setPrePlacedPieces(newPrePlacedPieces);
      setPlacedPieces({});
      setMoveHistory([]);
      setCanUndo(false);
      setCanErase(false);
    }
  }, [gameType, stage]);

  // Update button states based on game state
  useEffect(() => {
    setCanUndo(moveHistory.length > 0);
    setCanErase(Object.keys(placedPieces).length > 0 || eraserMode);
    setCanHint(selectedPiece !== null && !eraserMode);
    setCanRuler(selectedPiece !== null && !eraserMode);
    setCanPrevious(currentPuzzleIndex > 0);
  }, [moveHistory.length, placedPieces, selectedPiece, eraserMode, currentPuzzleIndex]);

  // Initialize sound manager
  useEffect(() => {
    soundManager.init();
  }, []);

  // Initialize Stage 3 if needed
  useEffect(() => {
    if (stage === 3) {
      stage3Manager.initializeStage3(1); // Start with 1 number piece
    }
  }, [stage]);

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
        soundManager.playButtonClick();
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
      soundManager.playInvalidPlacement();
      return;
    }

    // Use the duck matching validation logic
    const canPlace = canPlacePieceAt(rowIndex, colIndex, selectedPiece);
    console.log('canPlacePieceAt returned:', canPlace);
    
    if (!canPlace) {
      console.log('Validation failed - not placing piece');
      soundManager.playInvalidPlacement();
      return;
    }

    console.log('Placing piece:', selectedPiece, 'at:', cellKey);
    soundManager.playButtonClick();
    
    // Create new placed pieces state
    const newPlacedPieces = {
      ...placedPieces,
      [cellKey]: {
        type: selectedPiece,
        position: { row: rowIndex, col: colIndex }
      }
    };
    
    setPlacedPieces(newPlacedPieces);
    
    // Update move history
    setMoveHistory(prev => [...prev, { cellKey, pieceType: selectedPiece }]);
    
    // Check for completion after placing the piece
    setTimeout(() => {
      checkForCompletion(newPlacedPieces);
    }, 100);
    
    // Only clear the selected piece if we've placed the maximum number of this type
    const maxPieces = gameType === '4x4' ? 4 : 9;
    const pieceCount = Object.values(placedPieces).filter(p => p.type === selectedPiece).length;
    const newPieceCount = pieceCount + 1;
    if (newPieceCount >= maxPieces) {
      setSelectedPiece(null);
    }
    console.log('=== END CELL CLICK DEBUG ===');
  };

  // Helper to check if a row or cell was completed by the last move
  function didCompleteRowOrCell(rowIndex, colIndex, allPieces) {
    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    // Check row
    let rowComplete = true;
    for (let c = gameStart; c <= gameEnd; c++) {
      if (!allPieces[`${rowIndex}-${c}`]) {
        rowComplete = false;
        break;
      }
    }
    if (rowComplete) return true;
    // Check cell (box)
    const cellSize = gameType === '4x4' ? 2 : 3;
    const cellRow = Math.floor((rowIndex - gameStart) / cellSize);
    const cellCol = Math.floor((colIndex - gameStart) / cellSize);
    for (let r = gameStart + cellRow * cellSize; r < gameStart + (cellRow + 1) * cellSize; r++) {
      for (let c = gameStart + cellCol * cellSize; c < gameStart + (cellCol + 1) * cellSize; c++) {
        if (!allPieces[`${r}-${c}`]) {
          return false;
        }
      }
    }
    return true;
  }

  // Function to check for completion states
  const checkForCompletion = (currentPlacedPieces) => {
    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    const allPieces = { ...prePlacedPieces, ...currentPlacedPieces };
    const previousAllPieces = { ...prePlacedPieces, ...placedPieces };
    
    // Check if puzzle is complete
    const totalCells = (gameEnd - gameStart + 1) ** 2;
    const filledCells = Object.keys(allPieces).length;
    
    if (filledCells === totalCells) {
      // Check if the puzzle is solved correctly
      if (isPuzzleSolved(allPieces)) {
        soundManager.playPuzzleComplete();
        console.log('Puzzle completed!');
        return;
      }
    }
    
    // Check for NEWLY completed lines/columns/cells
    let hasNewCompletion = false;
    
    // Check rows
    for (let row = gameStart; row <= gameEnd; row++) {
      const wasComplete = isLineComplete(row, 'row', previousAllPieces);
      const isNowComplete = isLineComplete(row, 'row', allPieces);
      if (!wasComplete && isNowComplete) {
        hasNewCompletion = true;
        console.log(`Row ${row} newly completed!`);
      }
    }
    
    // Check columns
    for (let col = gameStart; col <= gameEnd; col++) {
      const wasComplete = isLineComplete(col, 'column', previousAllPieces);
      const isNowComplete = isLineComplete(col, 'column', allPieces);
      if (!wasComplete && isNowComplete) {
        hasNewCompletion = true;
        console.log(`Column ${col} newly completed!`);
      }
    }
    
    // Check cells (boxes) - 2x2 for 4x4, 3x3 for 9x9
    const cellSize = gameType === '4x4' ? 2 : 3;
    for (let cellRow = 0; cellRow < cellSize; cellRow++) {
      for (let cellCol = 0; cellCol < cellSize; cellCol++) {
        const wasComplete = isCellComplete(cellRow, cellCol, cellSize, previousAllPieces);
        const isNowComplete = isCellComplete(cellRow, cellCol, cellSize, allPieces);
        if (!wasComplete && isNowComplete) {
          hasNewCompletion = true;
          console.log(`Cell (${cellRow}, ${cellCol}) newly completed!`);
        }
      }
    }
    
    if (hasNewCompletion) {
      soundManager.playLineComplete();
    }
  };

  // Helper function to check if a line (row or column) is complete
  const isLineComplete = (index, type, allPieces) => {
    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    const pieces = new Set();
    
    for (let i = gameStart; i <= gameEnd; i++) {
      const cellKey = type === 'row' ? `${index}-${i}` : `${i}-${index}`;
      const piece = allPieces[cellKey];
      if (piece) {
        pieces.add(piece.type);
      }
    }
    
    return pieces.size === (gameEnd - gameStart + 1);
  };

  // Helper function to check if a cell (box) is complete
  const isCellComplete = (cellRow, cellCol, cellSize, allPieces) => {
    const gameStart = 2;
    const pieces = new Set();
    
    for (let r = gameStart + cellRow * cellSize; r < gameStart + (cellRow + 1) * cellSize; r++) {
      for (let c = gameStart + cellCol * cellSize; c < gameStart + (cellCol + 1) * cellSize; c++) {
        const cellKey = `${r}-${c}`;
        const piece = allPieces[cellKey];
        if (piece) {
          pieces.add(piece.type);
        }
      }
    }
    
    return pieces.size === cellSize * cellSize;
  };

  // Helper function to check if the entire puzzle is solved
  const isPuzzleSolved = (allPieces) => {
    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    
    // Check all rows
    for (let row = gameStart; row <= gameEnd; row++) {
      if (!isLineComplete(row, 'row', allPieces)) {
        return false;
      }
    }
    
    // Check all columns
    for (let col = gameStart; col <= gameEnd; col++) {
      if (!isLineComplete(col, 'column', allPieces)) {
        return false;
      }
    }
    
    // Check all cells
    const cellSize = gameType === '4x4' ? 2 : 3;
    for (let cellRow = 0; cellRow < cellSize; cellRow++) {
      for (let cellCol = 0; cellCol < cellSize; cellCol++) {
        if (!isCellComplete(cellRow, cellCol, cellSize, allPieces)) {
          return false;
        }
      }
    }
    
    return true;
  };

  const getPieceImagePath = (pieceType, isPrePlaced) => {
    // --- Number images ---
    // These should be imported at the top of the file:
    // import number1 from '../assets/tiles/numbers/Number1.png';
    // import number1Placed from '../assets/tiles/numbers/Number1_placed_by_game.png';
    // ... etc for 2-9
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
    const numberPlacedImages = {
      '1': number1Placed,
      '2': number2Placed,
      '3': number3Placed,
      '4': number4Placed,
      '5': number5Placed,
      '6': number6Placed,
      '7': number7Placed,
      '8': number8Placed,
      '9': number9Placed
    };

    if (stage === 3) {
      // Stage 3 uses mixed duck and number pieces
      if (isPrePlaced) {
        // Pre-placed pieces - check if it's a number or duck pre-placed piece
        if (pieceType.startsWith('SD')) {
          const number = pieceType.substring(2); // Extract number from SD1, SD2, etc.
          if (stage3Manager.isNumberPiece(number)) {
            // Use number pre-placed piece image
            return numberPlacedImages[number];
          } else {
            // Use duck pre-placed piece image
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
        }
        return pieceType; // Fallback
      } else {
        // Player pieces - check if it's a number or duck
        if (stage3Manager.isNumberPiece(pieceType)) {
          // Use number image
          return numberImages[pieceType];
        } else {
          // Use duck image
          const playerImages = {
            '1': una,
            '2': dux,
            '3': trey,
            '4': quacko,
            '5': lima,
            '6': hex,
            '7': set,
            '8': otto,
            '9': tisa
          };
          return playerImages[pieceType];
        }
      }
    } else {
      // Stages 1 and 2 use traditional duck system
      if (isPrePlaced) {
        // Pre-placed pieces
        if (pieceType.startsWith('SD')) {
          const number = pieceType.substring(2);
          // Stage 2: if this is a number, use the _placed_by_game image
          if (stage === 3 && gameType === '9x9' && numberImages[number] && numberPlacedImages[number]) {
            return numberPlacedImages[number];
          }
        }
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
      } else {
        // Player pieces
        if (stage === 3 && gameType === '9x9' && numberImages[pieceType]) {
          return numberImages[pieceType];
        }
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
      }
    }
  };

  // Button handlers
  const handleInfo = () => {
    soundManager.playUIOpen();
    setShowInfo(!showInfo);
    setShowHelp(false);
    setShowHint(false);
    setShowRuler(false);
  };

  const handleHelp = () => {
    soundManager.playUIOpen();
    setShowHelp(!showHelp);
    setShowInfo(false);
    setShowHint(false);
    setShowRuler(false);
  };

  const handleUndo = () => {
    if (moveHistory.length > 0) {
      soundManager.playButtonClick();
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
    if (eraserMode) {
      soundManager.playUIClose(); // Deactivating eraser mode
    } else {
      soundManager.playUIOpen(); // Activating eraser mode
    }
    setEraserMode(!eraserMode);
    // Clear selected piece when entering eraser mode
    if (!eraserMode) {
      setSelectedPiece(null);
    }
  };

  const handleHint = () => {
    if (selectedPiece) {
      if (hintMode) {
        soundManager.playUIClose(); // Deactivating hint mode
      } else {
        soundManager.playUIOpen(); // Activating hint mode
      }
      setHintMode(!hintMode);
      setShowHint(false);
      setShowInfo(false);
      setShowHelp(false);
      setShowRuler(false);
    }
  };

  const handleRuler = () => {
    if (selectedPiece) {
      if (rulerMode) {
        soundManager.playUIClose(); // Deactivating ruler mode
      } else {
        soundManager.playUIOpen(); // Activating ruler mode
      }
      setRulerMode(!rulerMode);
      setShowRuler(false);
      setShowInfo(false);
      setShowHelp(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentPuzzleIndex > 0) {
      soundManager.playNavigationClick();
      setCurrentPuzzleIndex(prev => prev - 1);
      // Generate new puzzle
      const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType, stage);
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
    soundManager.playNavigationClick();
    setCurrentPuzzleIndex(prev => prev + 1);
    // Generate new puzzle
    const { prePlacedPieces: newPrePlacedPieces } = generatePuzzle(gameType, stage);
    setPrePlacedPieces(newPrePlacedPieces);
    setPlacedPieces({});
    setMoveHistory([]);
    setSelectedPiece(null);
    setEraserMode(false);
    setHintMode(false);
    setRulerMode(false);
  };

  // Info navigation functions
  const handleCloseInfo = () => {
    soundManager.playUIClose();
    setShowInfo(false);
    setHighlightedInfoButton(null);
  };

  const handleInfoStepChange = (buttonName) => {
    console.log('GameBoard: Received highlight change:', buttonName);
    setHighlightedInfoButton(buttonName);
  };

  const handleCloseHelp = () => {
    soundManager.playUIClose();
    setShowHelp(false);
  };

  const handleMenu = () => {
    console.log('Menu button clicked! menuOpen:', menuOpen);
    if (menuOpen) {
      // Closing menu
      console.log('Closing menu, playing UI_Quirky8');
      soundManager.playUIClose();
    } else {
      // Opening menu
      console.log('Opening menu, playing UI_Quirky7');
      soundManager.playUIOpen();
    }
    setMenuOpen(!menuOpen);
    console.log('New menuOpen state will be:', !menuOpen);
  };

  const handleCloseMenu = () => {
    soundManager.playUIClose();
    setMenuOpen(false);
  };

  const handleToggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setIsSoundMuted(isMuted);
    console.log('Sound toggled. Muted:', isMuted);
    // Play a sound to confirm the toggle (if not muted)
    if (!isMuted) {
      soundManager.playButtonClick();
    }
  };

  const handleSelectStage = (stageId) => {
    console.log('Stage selected:', stageId);
    onStageChange(stageId);
  };

  const handleSelectDifficulty = (difficultyId) => {
    if (difficultyId === 'tutorial') {
      setShowTutorialWIPPopup(true);
      return;
    }
    setCurrentDifficulty(difficultyId);
    // TODO: Generate puzzle for other difficulties
  };

  const handleAbout = () => {
    setShowAboutPopup(true);
  };

  const handleCredits = () => {
    setShowCreditsPopup(true);
  };

  const handleSupport = () => {
    setShowSupportPopup(true);
  };

  const handleCloseAbout = () => {
    setShowAboutPopup(false);
  };

  const handleCloseCredits = () => {
    setShowCreditsPopup(false);
  };

  const handleCloseSupport = () => {
    setShowSupportPopup(false);
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
    
    // Get the matching pre-placed piece for this piece
    let matchingPrePlacedPiece;
    if (stage === 3) {
      matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(pieceType);
    } else {
      matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    }
    if (!matchingPrePlacedPiece) {
      return false; // Invalid piece type
    }
    
    // Check if this would violate the duck matching rules
    // A piece cannot be placed in the same row, column, or cell as its matching pre-placed piece
    
    // Check if this specific cell contains the matching pre-placed piece
    const currentCellPrePlaced = prePlacedPieces[cellKey];
    if (currentCellPrePlaced && currentCellPrePlaced.type === matchingPrePlacedPiece) {
      return false; // Cannot place piece in the same cell as its matching pre-placed piece
    }
    
    // Check row - see if the matching pre-placed piece is in the same row
    for (let c = gameStart; c <= gameEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place piece in same row as its matching pre-placed piece
      }
    }
    
    // Check column - see if the matching pre-placed piece is in the same column
    for (let r = gameStart; r <= gameEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place piece in same column as its matching pre-placed piece
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
          return false; // Cannot place piece in same cell (box) as its matching pre-placed piece
        }
      }
    }
    
    // Check if we haven't placed the maximum number of this piece type
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
    
    // Get the matching pre-placed piece for this piece
    let matchingPrePlacedPiece;
    if (stage === 3) {
      matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(pieceType);
    } else {
      matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    }
    if (!matchingPrePlacedPiece) {
      return false; // Invalid piece type
    }
    
    // Check if this cell would violate the duck matching rules
    // A piece cannot be placed in the same row, column, or cell as its matching pre-placed piece
    
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

    // Get the matching pre-placed piece for the selected piece
    let matchingPrePlacedPiece;
    if (stage === 3) {
      matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(selectedPiece);
    } else {
      const duckNumber = selectedPiece.split('-')[0];
      matchingPrePlacedPiece = `SD${duckNumber}`;
    }

    if (!matchingPrePlacedPiece) return null;

    const gameStart = 2;
    const gameEnd = gameType === '4x4' ? 5 : 10;
    const cellSize = gameType === '4x4' ? 2 : 3;

    // Find all positions of the matching pre-placed piece and placed pieces of the same type
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
    
    // Get the matching pre-placed piece for this piece
    let matchingPrePlacedPiece;
    if (stage === 3) {
      matchingPrePlacedPiece = stage3Manager.getPrePlacedPieceType(pieceType);
    } else {
      matchingPrePlacedPiece = getMatchingPrePlacedPiece(pieceType);
    }
    if (!matchingPrePlacedPiece) {
      return false; // Invalid piece type
    }
    
    // Check row - see if the matching pre-placed piece OR the same piece type is in the same row
    for (let c = gameStart; c <= gameEnd; c++) {
      const checkCellKey = `${rowIndex}-${c}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      const placedPiece = placedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place piece in same row as its matching pre-placed piece
      }
      
      if (placedPiece && placedPiece.type === pieceType) {
        return false; // Cannot place piece in same row as another piece of the same type
      }
    }
    
    // Check column - see if the matching pre-placed piece OR the same piece type is in the same column
    for (let r = gameStart; r <= gameEnd; r++) {
      const checkCellKey = `${r}-${colIndex}`;
      const prePlacedPiece = prePlacedPieces[checkCellKey];
      const placedPiece = placedPieces[checkCellKey];
      
      if (prePlacedPiece && prePlacedPiece.type === matchingPrePlacedPiece) {
        return false; // Cannot place piece in same column as its matching pre-placed piece
      }
      
      if (placedPiece && placedPiece.type === pieceType) {
        return false; // Cannot place piece in same column as another piece of the same type
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
          return false; // Cannot place piece in same cell (box) as its matching pre-placed piece
        }
        
        if (placedPiece && placedPiece.type === pieceType) {
          return false; // Cannot place piece in same cell (box) as another piece of the same type
        }
      }
    }
    
    return true;
  };

  // Custom handler for piece selection
  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
  };

  console.log('GameBoard render - highlightedInfoButton:', highlightedInfoButton);
  
  return (
    <div className={`game-container`}>
      <div className="game-board-container">
        {/* Menu Button - always visible */}
        <MenuButton onClick={handleMenu} isOpen={menuOpen} />
        <div className="game-board" data-game-type={gameType}>
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
              onPieceSelect={handlePieceSelect}
              stage={stage}
              placedPieces={placedPieces}
              prePlacedPieces={prePlacedPieces}
              highlightedButton={highlightedInfoButton}
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
              highlightedButton={highlightedInfoButton}
              eraserMode={eraserMode}
              hintMode={hintMode}
              rulerMode={rulerMode}
            />
          </div>
          
          {/* Info Popup - positioned inside game board */}
          {showInfo && (
            <InfoPopup 
              onClose={handleCloseInfo} 
              gameType={gameType} 
              stage={stage} 
              onStepChange={handleInfoStepChange}
            />
          )}
          
          {/* Help Popup - positioned inside game board */}
          {showHelp && (
            <HelpPopup onClose={handleCloseHelp} gameType={gameType} />
          )}
        </div>
        
        {/* Menu Popup */}
        <MenuPopup
          isOpen={menuOpen}
          onClose={handleCloseMenu}
          onToggleSound={handleToggleSound}
          onSelectStage={handleSelectStage}
          onSelectDifficulty={handleSelectDifficulty}
          onAbout={handleAbout}
          onCredits={handleCredits}
          onSupport={handleSupport}
          isSoundMuted={isSoundMuted}
          currentStage={stage}
          currentDifficulty={currentDifficulty}
        />
      </div>
      {/* Tutorial WIP Popup */}
      {showTutorialWIPPopup && (
        <div className="info-popup">
          <div className="popup-content">
            <h3>Whoops!</h3>
            <div className="info-description">
              We're still working on this bit.
            </div>
            <button className="close-button" onClick={() => setShowTutorialWIPPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
      {/* About Popup */}
      {showAboutPopup && (
        <div className="info-popup">
          <div className="popup-content">
            <h3>About Pseuducku</h3>
            <div className="info-description">
              <p><strong>Version:</strong> Beta 1.01</p>
              <p><strong>Release Date:</strong> December 19, 2024</p>
              <br />
              <p>Pseuducku was created to teach an octogenarian technophobe to play Sudoku.</p>
            </div>
            <button className="close-button" onClick={handleCloseAbout}>
              OK
            </button>
          </div>
        </div>
      )}
      {/* Credits Popup */}
      {showCreditsPopup && (
        <div className="info-popup">
          <div className="popup-content">
            <h3>Credits</h3>
            <div className="info-description">
              <p><strong>UI sound effects</strong> by Eric Mayas</p>
              <p><strong>Duck calls</strong> by C. M. Weller</p>
              <p><strong>Art</strong> by C. M. Weller with the assistance of ProCreate and GIMP</p>
              <p><strong>Programming</strong> by C. M. Weller with the assistance of Cursor</p>
            </div>
            <button className="close-button" onClick={handleCloseCredits}>
              OK
            </button>
          </div>
        </div>
      )}
      {/* Support Popup */}
      {showSupportPopup && (
        <div className="info-popup">
          <div className="popup-content">
            <h3>Support</h3>
            <div className="info-description">
              <p>You can support the maker of this program by...</p>
              <br />
              <p><strong>Subscribing to a tier on Patreon:</strong></p>
              <p><a href="https://www.patreon.com/c/cmweller" target="_blank" rel="noopener noreferrer">https://www.patreon.com/c/cmweller</a></p>
              <br />
              <p><strong>Sending them a Ko-Fi:</strong></p>
              <p><a href="https://ko-fi.com/cmweller" target="_blank" rel="noopener noreferrer">https://ko-fi.com/cmweller</a></p>
              <br />
              <p><strong>Or by bookmarking and visiting their hub site:</strong></p>
              <p><a href="https://www.internutter.org" target="_blank" rel="noopener noreferrer">https://www.internutter.org</a></p>
            </div>
            <button className="close-button" onClick={handleCloseSupport}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;