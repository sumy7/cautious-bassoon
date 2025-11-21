import {
  initializeBoard,
  initializeGame,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasValidMoves,
  hasWon,
  addRandomTile,
} from './gameLogic';

describe('Game Logic', () => {
  describe('initializeBoard', () => {
    it('should create a 4x4 board filled with zeros', () => {
      const board = initializeBoard();
      expect(board).toHaveLength(4);
      expect(board[0]).toHaveLength(4);
      expect(board.flat().every(cell => cell === 0)).toBe(true);
    });
  });

  describe('initializeGame', () => {
    it('should create a new game with two tiles', () => {
      const game = initializeGame();
      expect(game.board).toHaveLength(4);
      expect(game.score).toBe(0);
      expect(game.gameOver).toBe(false);
      expect(game.won).toBe(false);
      
      const nonZeroCells = game.board.flat().filter(cell => cell !== 0);
      expect(nonZeroCells).toHaveLength(2);
    });
  });

  describe('moveLeft', () => {
    it('should move tiles to the left', () => {
      const board = [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = moveLeft(board);
      expect(result.board[0][0]).toBe(2);
      expect(result.board[0][1]).toBe(0);
      expect(result.moved).toBe(true);
    });

    it('should merge tiles with same value', () => {
      const board = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = moveLeft(board);
      expect(result.board[0][0]).toBe(4);
      expect(result.board[0][1]).toBe(0);
      expect(result.score).toBe(4);
      expect(result.moved).toBe(true);
    });

    it('should not move if tiles are already left-aligned', () => {
      const board = [
        [2, 4, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = moveLeft(board);
      expect(result.moved).toBe(false);
    });
  });

  describe('hasValidMoves', () => {
    it('should return true if there are empty cells', () => {
      const board = [
        [2, 4, 8, 16],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      expect(hasValidMoves(board)).toBe(true);
    });

    it('should return true if there are adjacent matching tiles', () => {
      const board = [
        [2, 2, 8, 16],
        [4, 8, 16, 32],
        [2, 4, 8, 16],
        [4, 2, 4, 2],
      ];
      expect(hasValidMoves(board)).toBe(true);
    });

    it('should return false if no moves are possible', () => {
      const board = [
        [2, 4, 8, 16],
        [4, 8, 16, 32],
        [2, 4, 8, 16],
        [4, 2, 4, 2],
      ];
      expect(hasValidMoves(board)).toBe(false);
    });
  });

  describe('hasWon', () => {
    it('should return true if there is a 2048 tile', () => {
      const board = [
        [2048, 4, 8, 16],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      expect(hasWon(board)).toBe(true);
    });

    it('should return false if there is no 2048 tile', () => {
      const board = [
        [1024, 512, 256, 128],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      expect(hasWon(board)).toBe(false);
    });
  });

  describe('addRandomTile', () => {
    it('should add a tile to an empty cell', () => {
      const board = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const newBoard = addRandomTile(board);
      const nonZeroCells = newBoard.flat().filter(cell => cell !== 0);
      expect(nonZeroCells).toHaveLength(2);
    });

    it('should not modify the board if there are no empty cells', () => {
      const board = [
        [2, 4, 8, 16],
        [4, 8, 16, 32],
        [2, 4, 8, 16],
        [4, 2, 4, 2],
      ];
      const newBoard = addRandomTile(board);
      expect(newBoard).toEqual(board);
    });
  });
});
