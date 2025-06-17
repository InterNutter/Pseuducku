// Puzzle data for different game types and stages
export const PUZZLE_DATA = {
  '4x4': {
    stage1: {
      prePlacedPieces: {
        '2-2': { type: '1', isPrePlaced: true }, // SD1.png at row 2, col 2
        '2-3': { type: '2', isPrePlaced: true }, // SD2.png at row 2, col 3
        '3-2': { type: '3', isPrePlaced: true }, // SD3.png at row 3, col 2
        '3-3': { type: '4', isPrePlaced: true }  // SD4.png at row 3, col 3
      }
    }
  },
  '9x9': {
    stage1: {
      prePlacedPieces: {
        '2-2': { type: '1', isPrePlaced: true }, // SD1.png at row 2, col 2
        '2-3': { type: '2', isPrePlaced: true }, // SD2.png at row 2, col 3
        '2-4': { type: '3', isPrePlaced: true }, // SD3.png at row 2, col 4
        '3-2': { type: '4', isPrePlaced: true }, // SD4.png at row 3, col 2
        '3-3': { type: '5', isPrePlaced: true }, // SD5.png at row 3, col 3
        '3-4': { type: '6', isPrePlaced: true }, // SD6.png at row 3, col 4
        '4-2': { type: '7', isPrePlaced: true }, // SD7.png at row 4, col 2
        '4-3': { type: '8', isPrePlaced: true }, // SD8.png at row 4, col 3
        '4-4': { type: '9', isPrePlaced: true }  // SD9.png at row 4, col 4
      }
    }
  }
}; 