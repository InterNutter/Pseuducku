// Function to get valid cells for the 4x4 game
const getValidCells = () => {
  const validCells = [];
  // For 4x4, valid cells are in the 2x2 grid in the middle
  // Top left: 2-2, Top right: 2-3, Bottom left: 3-2, Bottom right: 3-3
  validCells.push('2-2'); // Top left
  validCells.push('2-3'); // Top right
  validCells.push('3-2'); // Bottom left
  validCells.push('3-3'); // Bottom right
  return validCells;
};

// Function to check if a number is valid in a given position
const isValidPlacement = (row, col, num, board) => {
  // Check row
  for (let c = 2; c <= 3; c++) {
    if (board[`${row}-${c}`]?.type === num.toString()) {
      return false;
    }
  }
  
  // Check column
  for (let r = 2; r <= 3; r++) {
    if (board[`${r}-${col}`]?.type === num.toString()) {
      return false;
    }
  }
  
  // Check 2x2 box (in this case, the entire grid is one box)
  for (let r = 2; r <= 3; r++) {
    for (let c = 2; c <= 3; c++) {
      if (board[`${r}-${col}`]?.type === num.toString()) {
        return false;
      }
    }
  }
  
  return true;
};

// Function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Function to generate a random puzzle for 4x4 game
export const generatePuzzle = () => {
  // Get all valid cells and shuffle them
  const validCells = shuffleArray(getValidCells());
  
  // For 4x4, we want to leave at least 1 space for the player
  // and at most 3 pre-placed pieces
  const numPrePlaced = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
  
  // Create the pre-placed pieces object
  const prePlacedPieces = {};
  
  // Shuffle the numbers 1-4
  const availableNumbers = shuffleArray([1, 2, 3, 4]);
  
  // First, try to place a number in each cell
  for (let i = 0; i < validCells.length; i++) {
    const cellKey = validCells[i];
    const [row, col] = cellKey.split('-').map(Number);
    
    // Find the first available number that's valid in this position
    const validNumber = availableNumbers.find(num => 
      isValidPlacement(row, col, num, prePlacedPieces)
    );
    
    if (validNumber) {
      prePlacedPieces[cellKey] = {
        type: validNumber.toString(),
        isPrePlaced: true
      };
    }
  }
  
  // If we have more pieces than we want, remove some randomly
  const placedCells = Object.keys(prePlacedPieces);
  while (placedCells.length > numPrePlaced) {
    const randomIndex = Math.floor(Math.random() * placedCells.length);
    const cellToRemove = placedCells[randomIndex];
    delete prePlacedPieces[cellToRemove];
    placedCells.splice(randomIndex, 1);
  }
  
  return {
    prePlacedPieces,
    remainingCells: validCells.filter(cell => !prePlacedPieces[cell])
  };
}; 