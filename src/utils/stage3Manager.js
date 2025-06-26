// Stage 3 Manager for mixed duck and number pieces
class Stage3Manager {
  constructor() {
    this.numberPieces = new Set();
    this.duckPieces = new Set();
  }

  // Initialize Stage 3 with specified number of number pieces
  initializeStage3(numNumberPieces = 1) {
    this.numberPieces.clear();
    this.duckPieces.clear();

    // For the first Stage 3 game, only 1 number piece
    const allPieces = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    // Randomly select which pieces will be numbers
    const shuffledPieces = this.shuffleArray([...allPieces]);
    const selectedNumbers = shuffledPieces.slice(0, numNumberPieces);
    
    // Add selected numbers to number pieces
    selectedNumbers.forEach(num => {
      this.numberPieces.add(num);
    });

    // Remaining pieces are ducks
    allPieces.forEach(piece => {
      if (!this.numberPieces.has(piece)) {
        this.duckPieces.add(piece);
      }
    });

    console.log('Stage 3 initialized:', {
      numberPieces: Array.from(this.numberPieces),
      duckPieces: Array.from(this.duckPieces)
    });
  }

  // Check if a piece is a number or duck
  isNumberPiece(pieceType) {
    return this.numberPieces.has(pieceType);
  }

  isDuckPiece(pieceType) {
    return this.duckPieces.has(pieceType);
  }

  // Get the piece type for display (number or duck name)
  getPieceDisplayType(pieceType) {
    if (this.isNumberPiece(pieceType)) {
      return pieceType; // Just the number
    } else {
      // Convert number to duck name
      const duckNames = {
        '1': '1-Una',
        '2': '2-Dux', 
        '3': '3-Trey',
        '4': '4-Quacko',
        '5': '5-Lima',
        '6': '6-Hex',
        '7': '7-Set',
        '8': '8-Otto',
        '9': '9-Tisa'
      };
      return duckNames[pieceType] || pieceType;
    }
  }

  // Get the pre-placed piece type for a given piece
  getPrePlacedPieceType(pieceType) {
    // In Stage 3, pre-placed pieces use the same system as the piece type
    if (this.isNumberPiece(pieceType)) {
      return `SD${pieceType}`; // Pre-placed number piece
    } else {
      // Convert duck piece to pre-placed piece
      const duckToPrePlaced = {
        '1': 'SD1',
        '2': 'SD2',
        '3': 'SD3', 
        '4': 'SD4',
        '5': 'SD5',
        '6': 'SD6',
        '7': 'SD7',
        '8': 'SD8',
        '9': 'SD9'
      };
      return duckToPrePlaced[pieceType] || `SD${pieceType}`;
    }
  }

  // Get the matching piece for duck matching rules
  getMatchingPiece(pieceType) {
    // In Stage 3, the matching piece is always the same number
    // Whether it's a duck or number piece, it matches the same number
    return pieceType;
  }

  // Get all pieces for the current stage
  getAllPieces() {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }

  // Get the duck matching mapping for Stage 3
  getDuckMatching() {
    const mapping = {};
    for (let i = 1; i <= 9; i++) {
      const pieceType = i.toString();
      if (this.isNumberPiece(pieceType)) {
        // Number piece maps to number pre-placed piece
        mapping[pieceType] = `SD${pieceType}`;
      } else {
        // Duck piece maps to number pre-placed piece (same number)
        mapping[this.getPieceDisplayType(pieceType)] = `SD${pieceType}`;
      }
    }
    return mapping;
  }

  // Shuffle array utility
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}

// Create and export a singleton instance
const stage3Manager = new Stage3Manager();

export default stage3Manager; 