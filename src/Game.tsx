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
import './Game.css';

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

  return (
    <div className="game-container">
      <div className="header">
        <h1 className="title">2048</h1>
        <div className="scores">
          <div className="score-container">
            <div className="score-label">SCORE</div>
            <div className="score-value">{gameState.score}</div>
          </div>
          <div className="score-container">
            <div className="score-label">BEST</div>
            <div className="score-value">{bestScore}</div>
          </div>
        </div>
      </div>

      <div className="info">
        <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
        <button className="new-game-button" onClick={resetGame}>
          New Game
        </button>
      </div>

      {gameState.won && !gameState.gameOver && (
        <div className="game-message win">
          <p>You win!</p>
          <button onClick={resetGame}>Try again</button>
        </div>
      )}

      {gameState.gameOver && (
        <div className="game-message game-over">
          <p>Game over!</p>
          <button onClick={resetGame}>Try again</button>
        </div>
      )}

      <div className="board">
        {gameState.board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`tile ${cell !== 0 ? 'tile-' + cell : ''}`}
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

      <div className="instructions">
        <p>
          <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles.
          When two tiles with the same number touch, they <strong>merge into one!</strong>
        </p>
      </div>
    </div>
  );
};

export default Game;
