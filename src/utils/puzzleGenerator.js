// Function to get valid cells for the game
const getValidCells = (gameType) => {
  const validCells = [];
  
  if (gameType === '4x4') {
    // For 4x4, valid cells are in the 4x4 grid in the middle
    // The game grid is located on rows 3-6, columns 3-6 (counting from 1)
    // This translates to array indices: rows 2-5, columns 2-5 (since arrays are 0-indexed)
    
    // Row 3 (array index 2): columns 3-6 (array indices 2-5)
    validCells.push('2-2');
    validCells.push('2-3'); 
    validCells.push('2-4');
    validCells.push('2-5');
    
    // Row 4 (array index 3): columns 3-6 (array indices 2-5)
    validCells.push('3-2');
    validCells.push('3-3');
    validCells.push('3-4'); 
    validCells.push('3-5');
    
    // Row 5 (array index 4): columns 3-6 (array indices 2-5)
    validCells.push('4-2');
    validCells.push('4-3');
    validCells.push('4-4');
    validCells.push('4-5');
    
    // Row 6 (array index 5): columns 3-6 (array indices 2-5)
    validCells.push('5-2');
    validCells.push('5-3');
    validCells.push('5-4');
    validCells.push('5-5');
  } else if (gameType === '9x9') {
    // For 9x9, valid cells are in the 9x9 grid in the middle
    // The game grid is located on rows 3-11, columns 3-11 (counting from 1)
    // This translates to array indices: rows 2-10, columns 2-10 (since arrays are 0-indexed)
    
    for (let row = 2; row <= 10; row++) {
      for (let col = 2; col <= 10; col++) {
        validCells.push(`${row}-${col}`);
      }
    }
  }
  
  return validCells;
};

// Function to check if a number is valid in a given position
const isValidPlacement = (row, col, num, board) => {
  const cellKey = `${row}-${col}`;
  
  // First, check if this cell already has a piece (any piece)
  if (board[cellKey]) {
    return false; // Cell is already occupied
  }
  
  // Check row - for 4x4, check the 4 cells in the same row (columns 2-5)
  for (let c = 2; c <= 5; c++) {
    if (board[`${row}-${c}`]?.type === num.toString()) {
      return false; // Can't have same number in same row
    }
  }
  
  // Check column - for 4x4, check the 4 cells in the same column (rows 2-5)
  for (let r = 2; r <= 5; r++) {
    if (board[`${r}-${col}`]?.type === num.toString()) {
      return false; // Can't have same number in same column
    }
  }
  
  // For this game, we allow multiple pieces of the same number overall
  // But we still need to check if we've already placed 4 of this number total
  let count = 0;
  for (let r = 2; r <= 5; r++) {
    for (let c = 2; c <= 5; c++) {
      if (board[`${r}-${c}`]?.type === num.toString()) {
        count++;
      }
    }
  }
  
  // If we already have 4 of this number, we can't place another
  if (count >= 4) {
    return false;
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

// Function to generate a random puzzle for the game
export const generatePuzzle = (gameType = '4x4') => {
  if (gameType === '4x4') {
    // For a solvable puzzle, we need to start with a complete valid solution
    // and then remove some pieces to create the puzzle
    
    // First, create a complete valid 4x4 Sudoku solution
    const completeSolution = generateCompleteSolution();
    
    // For an easier first game, we'll remove 4-8 pieces (leaving 8-12 pre-placed pieces)
    const numToRemove = Math.floor(Math.random() * 5) + 4; // Random number between 4 and 8
    
    // Create the pre-placed pieces by removing some pieces from the complete solution
    const prePlacedPieces = {};
    const validCells = getValidCells(gameType);
    
    // Randomly select which cells to keep as pre-placed pieces
    const shuffledCells = shuffleArray([...validCells]);
    const cellsToKeep = shuffledCells.slice(0, 16 - numToRemove);
    
    // Add the kept cells to pre-placed pieces
    cellsToKeep.forEach(cellKey => {
      const [row, col] = cellKey.split('-').map(Number);
      // Map the valid cell coordinates (2-5) to solution array indices (0-3)
      const solutionRow = row - 2;
      const solutionCol = col - 2;
      const pieceType = completeSolution[solutionRow][solutionCol];
      if (pieceType) {
        prePlacedPieces[cellKey] = {
          type: pieceType.toString(),
          isPrePlaced: true
        };
      }
    });
    
    // Debug logging
    console.log('Generated pre-placed pieces:', prePlacedPieces);
    console.log('Remaining cells:', validCells.filter(cell => !prePlacedPieces[cell]));
    
    return {
      prePlacedPieces,
      remainingCells: validCells.filter(cell => !prePlacedPieces[cell])
    };
  } else if (gameType === '9x9') {
    // For 9x9, we'll create a proper solvable puzzle
    // Start with a complete valid 9x9 Sudoku solution and remove pieces
    
    // First, create a complete valid 9x9 Sudoku solution
    const completeSolution = generateComplete9x9Solution();
    
    // For an easier first game, we'll remove 30-40 pieces (leaving 41-51 pre-placed pieces)
    const numToRemove = Math.floor(Math.random() * 11) + 30; // Random number between 30 and 40
    
    // Create the pre-placed pieces by removing some pieces from the complete solution
    const prePlacedPieces = {};
    const validCells = getValidCells(gameType);
    
    // Randomly select which cells to keep as pre-placed pieces
    const shuffledCells = shuffleArray([...validCells]);
    const cellsToKeep = shuffledCells.slice(0, 81 - numToRemove);
    
    // Add the kept cells to pre-placed pieces
    cellsToKeep.forEach(cellKey => {
      const [row, col] = cellKey.split('-').map(Number);
      // Map the valid cell coordinates (2-10) to solution array indices (0-8)
      const solutionRow = row - 2;
      const solutionCol = col - 2;
      const pieceType = completeSolution[solutionRow][solutionCol];
      if (pieceType) {
        prePlacedPieces[cellKey] = {
          type: pieceType.toString(),
          isPrePlaced: true
        };
      }
    });
    
    return {
      prePlacedPieces,
      remainingCells: validCells.filter(cell => !prePlacedPieces[cell])
    };
  }
};

// Function to generate a complete valid 4x4 Sudoku solution
const generateCompleteSolution = () => {
  // Create a 4x4 grid filled with a valid Sudoku solution
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
  ];
  
  // Randomly shuffle the solution to create variety
  // We can swap rows, columns, or numbers while maintaining validity
  const shuffledSolution = shuffleSolution(solution);
  
  return shuffledSolution;
};

// Function to shuffle a valid solution while keeping it valid
const shuffleSolution = (solution) => {
  const newSolution = solution.map(row => [...row]);
  const size = solution.length; // 4 for 4x4, 9 for 9x9
  
  // Randomly decide what transformations to apply
  const transformations = Math.floor(Math.random() * 4);
  
  switch (transformations) {
    case 0:
      // Swap rows within the same block
      if (size === 4) {
        // For 4x4: swap rows 1-2 and 3-4
        [newSolution[0], newSolution[1]] = [newSolution[1], newSolution[0]];
        [newSolution[2], newSolution[3]] = [newSolution[3], newSolution[2]];
      } else {
        // For 9x9: swap rows within the same 3x3 block
        const block1 = Math.floor(Math.random() * 3) * 3;
        const block2 = Math.floor(Math.random() * 3) * 3;
        const row1 = block1 + Math.floor(Math.random() * 3);
        const row2 = block2 + Math.floor(Math.random() * 3);
        [newSolution[row1], newSolution[row2]] = [newSolution[row2], newSolution[row1]];
      }
      break;
    case 1:
      // Swap columns within the same block
      if (size === 4) {
        // For 4x4: swap columns 1-2 and 3-4
        for (let i = 0; i < 4; i++) {
          [newSolution[i][0], newSolution[i][1]] = [newSolution[i][1], newSolution[i][0]];
          [newSolution[i][2], newSolution[i][3]] = [newSolution[i][3], newSolution[i][2]];
        }
      } else {
        // For 9x9: swap columns within the same 3x3 block
        const block1 = Math.floor(Math.random() * 3) * 3;
        const block2 = Math.floor(Math.random() * 3) * 3;
        const col1 = block1 + Math.floor(Math.random() * 3);
        const col2 = block2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < 9; i++) {
          [newSolution[i][col1], newSolution[i][col2]] = [newSolution[i][col2], newSolution[i][col1]];
        }
      }
      break;
    case 2:
      // Swap numbers
      if (size === 4) {
        // For 4x4: swap numbers 1-2 and 3-4
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newSolution[i][j] === 1) newSolution[i][j] = 2;
            else if (newSolution[i][j] === 2) newSolution[i][j] = 1;
            else if (newSolution[i][j] === 3) newSolution[i][j] = 4;
            else if (newSolution[i][j] === 4) newSolution[i][j] = 3;
          }
        }
      } else {
        // For 9x9: swap two random numbers
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newSolution[i][j] === num1) newSolution[i][j] = num2;
            else if (newSolution[i][j] === num2) newSolution[i][j] = num1;
          }
        }
      }
      break;
    case 3:
      // Rotate the grid 90 degrees
      const rotated = [];
      for (let i = 0; i < size; i++) {
        rotated[i] = [];
        for (let j = 0; j < size; j++) {
          rotated[i][j] = newSolution[size - 1 - j][i];
        }
      }
      return rotated;
  }
  
  return newSolution;
};

// Function to generate a complete valid 9x9 Sudoku solution
const generateComplete9x9Solution = () => {
  // Create a 9x9 grid filled with a valid Sudoku solution
  const solution = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
  ];
  
  // Randomly shuffle the solution to create variety
  // We can swap rows, columns, or numbers while maintaining validity
  const shuffledSolution = shuffleSolution(solution);
  
  return shuffledSolution;
}; 