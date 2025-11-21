// Game logic for 2048

export type Cell = number;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  score: number;
  gameOver: boolean;
  won: boolean;
}

// Initialize an empty 4x4 board
export const initializeBoard = (): Board => {
  return Array(4).fill(null).map(() => Array(4).fill(0));
};

// Add a random tile (2 or 4) to an empty cell
export const addRandomTile = (board: Board): Board => {
  const emptyCells: [number, number][] = [];
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  
  if (emptyCells.length === 0) return board;
  
  const newBoard = board.map(row => [...row]);
  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  
  return newBoard;
};

// Initialize game with two random tiles
export const initializeGame = (): GameState => {
  let board = initializeBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  
  return {
    board,
    score: 0,
    gameOver: false,
    won: false,
  };
};

// Slide and merge tiles in a single row
const processRow = (row: Cell[]): { row: Cell[]; score: number } => {
  let newRow = row.filter(cell => cell !== 0);
  let score = 0;
  
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }
  
  newRow = newRow.filter(cell => cell !== 0);
  
  while (newRow.length < 4) {
    newRow.push(0);
  }
  
  return { row: newRow, score };
};

// Move tiles left
export const moveLeft = (board: Board): { board: Board; score: number; moved: boolean } => {
  let totalScore = 0;
  let moved = false;
  const newBoard = board.map(row => {
    const { row: newRow, score } = processRow(row);
    totalScore += score;
    if (JSON.stringify(row) !== JSON.stringify(newRow)) {
      moved = true;
    }
    return newRow;
  });
  
  return { board: newBoard, score: totalScore, moved };
};

// Rotate board 90 degrees clockwise
const rotateBoard = (board: Board): Board => {
  const newBoard = initializeBoard();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newBoard[j][3 - i] = board[i][j];
    }
  }
  return newBoard;
};

// Move tiles right
export const moveRight = (board: Board): { board: Board; score: number; moved: boolean } => {
  let rotated = rotateBoard(rotateBoard(board));
  const result = moveLeft(rotated);
  result.board = rotateBoard(rotateBoard(result.board));
  return result;
};

// Move tiles up
export const moveUp = (board: Board): { board: Board; score: number; moved: boolean } => {
  let rotated = rotateBoard(rotateBoard(rotateBoard(board)));
  const result = moveLeft(rotated);
  result.board = rotateBoard(result.board);
  return result;
};

// Move tiles down
export const moveDown = (board: Board): { board: Board; score: number; moved: boolean } => {
  let rotated = rotateBoard(board);
  const result = moveLeft(rotated);
  result.board = rotateBoard(rotateBoard(rotateBoard(result.board)));
  return result;
};

// Check if there are any valid moves left
export const hasValidMoves = (board: Board): boolean => {
  // Check for empty cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return true;
    }
  }
  
  // Check for adjacent matching tiles
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (j < 3 && board[i][j] === board[i][j + 1]) return true;
      if (i < 3 && board[i][j] === board[i + 1][j]) return true;
    }
  }
  
  return false;
};

// Check if player has won (has 2048 tile)
export const hasWon = (board: Board): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) return true;
    }
  }
  return false;
};
