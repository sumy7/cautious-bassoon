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
      0: 'linear-gradient(135deg, #cdc1b4 0%, #b8aea5 100%)',
      2: 'linear-gradient(135deg, #eee4da 0%, #ede0c8 100%)',
      4: 'linear-gradient(135deg, #ede0c8 0%, #f2b179 100%)',
      8: 'linear-gradient(135deg, #f2b179 0%, #f59563 100%)',
      16: 'linear-gradient(135deg, #f59563 0%, #f67c5f 100%)',
      32: 'linear-gradient(135deg, #f67c5f 0%, #f65e3b 100%)',
      64: 'linear-gradient(135deg, #f65e3b 0%, #e94b2f 100%)',
      128: 'linear-gradient(135deg, #edcf72 0%, #edcc61 100%)',
      256: 'linear-gradient(135deg, #edcc61 0%, #edc850 100%)',
      512: 'linear-gradient(135deg, #edc850 0%, #edc53f 100%)',
      1024: 'linear-gradient(135deg, #edc53f 0%, #edc22e 100%)',
      2048: 'linear-gradient(135deg, #edc22e 0%, #d4a825 100%)',
    };
    return colors[value] || 'linear-gradient(135deg, #3c3a32 0%, #2c2a24 100%)';
  };

  const getTileContent = (value: number): string => {
    const emojis: { [key: number]: string } = {
      2: '🌱',
      4: '🌿',
      8: '🌳',
      16: '🌲',
      32: '🍎',
      64: '🍊',
      128: '🍋',
      256: '🍌',
      512: '🍉',
      1024: '🍇',
      2048: '🍓',
    };
    return emojis[value] || value.toString();
  };

  const getTileFontSizeClass = (value: number) => {
    if (value >= 1024) return 'text-[35px] sm:text-[25px]';
    if (value >= 128) return 'text-[45px] sm:text-[30px]';
    return 'text-[55px] sm:text-[35px]';
  };

  const emojiLegend = [
    { value: 2, emoji: '🌱' },
    { value: 4, emoji: '🌿' },
    { value: 8, emoji: '🌳' },
    { value: 16, emoji: '🌲' },
    { value: 32, emoji: '🍎' },
    { value: 64, emoji: '🍊' },
    { value: 128, emoji: '🍋' },
    { value: 256, emoji: '🍌' },
    { value: 512, emoji: '🍉' },
    { value: 1024, emoji: '🍇' },
    { value: 2048, emoji: '🍓' },
  ];

  return (
    <div className="max-w-[500px] mx-auto my-10 p-5 sm:p-2.5 sm:my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[60px] font-bold text-text-dark m-0 sm:text-[40px] drop-shadow-lg animate-float">合成大草莓</h1>
        <div className="flex gap-2.5">
          <div className="bg-gradient-to-br from-board-bg to-[#9d8b7e] px-[25px] py-2.5 rounded-lg text-center min-w-[80px] sm:px-[15px] sm:py-[5px] sm:min-w-[60px] shadow-score transform transition-transform hover:scale-105">
            <div className="text-score-label text-[13px] font-bold uppercase sm:text-[11px]">分数</div>
            <div className="text-white text-[25px] font-bold sm:text-[18px] drop-shadow">{gameState.score}</div>
          </div>
          <div className="bg-gradient-to-br from-board-bg to-[#9d8b7e] px-[25px] py-2.5 rounded-lg text-center min-w-[80px] sm:px-[15px] sm:py-[5px] sm:min-w-[60px] shadow-score transform transition-transform hover:scale-105">
            <div className="text-score-label text-[13px] font-bold uppercase sm:text-[11px]">最高分</div>
            <div className="text-white text-[25px] font-bold sm:text-[18px] drop-shadow">{bestScore}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5 sm:flex-col sm:gap-2.5 sm:items-start">
        <p className="text-text-dark text-base m-0 drop-shadow">合并 Emoji，合成<strong>大草莓！</strong></p>
        <button 
          className="bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-lg px-5 py-2.5 text-lg font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button hover:shadow-button-hover transform hover:scale-105 hover:-translate-y-0.5" 
          onClick={resetGame}
        >
          新游戏
        </button>
      </div>

      <div className="relative">
        {gameState.won && !gameState.gameOver && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#edc22e]/95 to-[#d4a825]/95 flex flex-col items-center justify-center rounded-xl z-50 animate-appear shadow-glow backdrop-blur-sm">
            <p className="text-[60px] font-bold text-text-light mb-5 sm:text-[40px] drop-shadow-lg">你赢了！🎉</p>
            <button 
              className="bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-lg px-[30px] py-[15px] text-[20px] font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button-hover transform hover:scale-105"
              onClick={resetGame}
            >
              再试一次
            </button>
          </div>
        )}

        {gameState.gameOver && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#eee4da]/95 to-[#d8cfc7]/95 flex flex-col items-center justify-center rounded-xl z-50 animate-appear shadow-2xl backdrop-blur-sm">
            <p className="text-[60px] font-bold text-text-dark mb-5 sm:text-[40px] drop-shadow-lg">游戏结束！</p>
            <button 
              className="bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-lg px-[30px] py-[15px] text-[20px] font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button-hover transform hover:scale-105"
              onClick={resetGame}
            >
              再试一次
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 grid-rows-4 gap-[15px] bg-gradient-to-br from-board-bg to-[#9d8b7e] p-[15px] rounded-xl w-full aspect-square sm:gap-[10px] sm:p-[10px] shadow-board">
          {gameState.board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`flex items-center justify-center font-bold rounded-lg transition-all duration-150 ease-in-out ${
                  cell !== 0 ? 'animate-appear shadow-tile hover:shadow-tile-hover' : 'shadow-inner'
                } ${getTileFontSizeClass(cell)}`}
                style={{
                  background: getTileColor(cell),
                  color: cell > 4 ? '#f9f6f2' : '#776e65',
                  textShadow: cell > 4 ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {cell !== 0 && getTileContent(cell)}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5 text-text-dark text-sm text-center drop-shadow">
        <p className="m-0 leading-relaxed">
          <strong>玩法说明：</strong> 使用 <strong>方向键</strong> 移动方块。
          当两个相同的 Emoji 相遇时，它们会 <strong>合并成一个新的！</strong>
        </p>
      </div>

      <div className="mt-8 border-t border-text-dark/20 pt-5">
        <h3 className="text-text-dark text-lg font-bold mb-4 text-center drop-shadow">进化图鉴</h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-3">
          {emojiLegend.map((item) => (
            <div key={item.value} className="flex flex-col items-center p-2 bg-gradient-to-br from-board-bg/20 to-board-bg/10 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 transform">
              <span className="text-2xl mb-1 drop-shadow">{item.emoji}</span>
              <span className="text-text-dark font-bold text-xs">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
