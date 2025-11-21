import React, { useState, useEffect, useCallback } from 'react';
import {
  initializeGame,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasValidMoves,
  hasWon,
  GameState,
} from './gameLogic';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [bestScore, setBestScore] = useState<number>(0);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Save best score to localStorage
  useEffect(() => {
    if (gameState.score > bestScore) {
      setBestScore(gameState.score);
      localStorage.setItem('bestScore', gameState.score.toString());
    }
  }, [gameState.score, bestScore]);

  const handleMove = useCallback(
    (moveFunction: typeof moveLeft) => {
      if (gameState.gameOver) return;

      const { board: newBoard, score: moveScore, moved } = moveFunction(gameState.board);

      if (!moved) return;

      const boardWithNewTile = addRandomTile(newBoard);
      const newScore = gameState.score + moveScore;
      const won = hasWon(boardWithNewTile);
      const gameOver = !hasValidMoves(boardWithNewTile);

      setGameState({
        board: boardWithNewTile,
        score: newScore,
        gameOver,
        won: won || gameState.won,
      });
    },
    [gameState]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handleMove(moveLeft);
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleMove(moveRight);
          break;
        case 'ArrowUp':
          event.preventDefault();
          handleMove(moveUp);
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleMove(moveDown);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  const resetGame = () => {
    setGameState(initializeGame());
  };

  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      0: '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  const getTileFontSizeClass = (value: number) => {
    if (value >= 1024) return 'text-[35px] sm:text-[25px]';
    if (value >= 128) return 'text-[45px] sm:text-[30px]';
    return 'text-[55px] sm:text-[35px]';
  };

  return (
    <div className="max-w-[500px] mx-auto my-10 p-5 sm:p-2.5 sm:my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[80px] font-bold text-text-dark m-0 sm:text-[50px]">2048</h1>
        <div className="flex gap-2.5">
          <div className="bg-board-bg px-[25px] py-2.5 rounded-[3px] text-center min-w-[80px] sm:px-[15px] sm:py-[5px] sm:min-w-[60px]">
            <div className="text-score-label text-[13px] font-bold uppercase sm:text-[11px]">SCORE</div>
            <div className="text-white text-[25px] font-bold sm:text-[18px]">{gameState.score}</div>
          </div>
          <div className="bg-board-bg px-[25px] py-2.5 rounded-[3px] text-center min-w-[80px] sm:px-[15px] sm:py-[5px] sm:min-w-[60px]">
            <div className="text-score-label text-[13px] font-bold uppercase sm:text-[11px]">BEST</div>
            <div className="text-white text-[25px] font-bold sm:text-[18px]">{bestScore}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5 sm:flex-col sm:gap-2.5 sm:items-start">
        <p className="text-text-dark text-base m-0">Join the numbers and get to the <strong>2048 tile!</strong></p>
        <button 
          className="bg-button-bg text-text-light border-none rounded-[3px] px-5 py-2.5 text-lg font-bold cursor-pointer transition-colors duration-200 hover:bg-button-hover" 
          onClick={resetGame}
        >
          New Game
        </button>
      </div>

      <div className="relative">
        {gameState.won && !gameState.gameOver && (
          <div className="absolute inset-0 bg-[#edc22e]/95 flex flex-col items-center justify-center rounded-md z-50 animate-appear">
            <p className="text-[60px] font-bold text-text-light mb-5 sm:text-[40px]">You win!</p>
            <button 
              className="bg-button-bg text-text-light border-none rounded-[3px] px-[30px] py-[15px] text-[20px] font-bold cursor-pointer transition-colors duration-200 hover:bg-button-hover"
              onClick={resetGame}
            >
              Try again
            </button>
          </div>
        )}

        {gameState.gameOver && (
          <div className="absolute inset-0 bg-[#eee4da]/95 flex flex-col items-center justify-center rounded-md z-50 animate-appear">
            <p className="text-[60px] font-bold text-text-dark mb-5 sm:text-[40px]">Game over!</p>
            <button 
              className="bg-button-bg text-text-light border-none rounded-[3px] px-[30px] py-[15px] text-[20px] font-bold cursor-pointer transition-colors duration-200 hover:bg-button-hover"
              onClick={resetGame}
            >
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 grid-rows-4 gap-[15px] bg-board-bg p-[15px] rounded-md w-full aspect-square sm:gap-[10px] sm:p-[10px]">
          {gameState.board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`flex items-center justify-center font-bold rounded-[3px] transition-all duration-150 ease-in-out ${
                  cell !== 0 ? 'animate-appear' : ''
                } ${getTileFontSizeClass(cell)}`}
                style={{
                  backgroundColor: getTileColor(cell),
                  color: cell > 4 ? '#f9f6f2' : '#776e65',
                }}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5 text-text-dark text-sm text-center">
        <p className="m-0 leading-relaxed">
          <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles.
          When two tiles with the same number touch, they <strong>merge into one!</strong>
        </p>
      </div>
    </div>
  );
};

export default Game;
