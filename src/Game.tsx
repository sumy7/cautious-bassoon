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
    if (value >= 1024) return 'text-[35px] md:text-[30px] sm:text-[25px] xs:text-[20px]';
    if (value >= 128) return 'text-[45px] md:text-[38px] sm:text-[30px] xs:text-[24px]';
    return 'text-[55px] md:text-[45px] sm:text-[35px] xs:text-[28px]';
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
    <div className="w-full mx-auto my-10 p-5 md:p-4 sm:p-3 sm:my-5 xs:my-2 xs:p-2 max-w-[1200px]">
      {/* Title - Always at top, centered on small screens */}
      <div className="mb-8 sm:mb-5">
        <h1 className="text-[60px] font-bold text-text-dark m-0 md:text-[50px] sm:text-[40px] xs:text-[32px] drop-shadow-lg animate-float text-center">
          🍓 合成大草莓 🍓
        </h1>
      </div>

      {/* Main content: side-by-side on large screens, stacked on small */}
      <div className="flex flex-col lg:flex-row lg:gap-8 gap-5">
        {/* Left side: Game board */}
        <div className="flex-shrink-0 lg:w-[500px] w-full max-w-[500px] mx-auto lg:mx-0">
          <div className="relative">
            {gameState.won && !gameState.gameOver && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#edc22e]/95 to-[#d4a825]/95 flex flex-col items-center justify-center rounded-xl z-50 animate-appear shadow-glow backdrop-blur-sm p-4">
                <p className="text-[60px] font-bold text-text-light mb-5 md:text-[50px] sm:text-[40px] xs:text-[32px] drop-shadow-lg">
                  🎉 你赢了！🏆
                </p>
                <button 
                  className="bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-lg px-[30px] py-[15px] text-[20px] md:px-6 md:py-3 md:text-lg sm:px-5 sm:py-2.5 sm:text-base xs:px-4 xs:py-2 xs:text-sm font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button-hover transform hover:scale-105"
                  onClick={resetGame}
                >
                  🔄 再试一次
                </button>
              </div>
            )}

            {gameState.gameOver && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#eee4da]/95 to-[#d8cfc7]/95 flex flex-col items-center justify-center rounded-xl z-50 animate-appear shadow-2xl backdrop-blur-sm p-4">
                <p className="text-[60px] font-bold text-text-dark mb-5 md:text-[50px] sm:text-[40px] xs:text-[32px] drop-shadow-lg">
                  😢 游戏结束！💔
                </p>
                <button 
                  className="bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-lg px-[30px] py-[15px] text-[20px] md:px-6 md:py-3 md:text-lg sm:px-5 sm:py-2.5 sm:text-base xs:px-4 xs:py-2 xs:text-sm font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button-hover transform hover:scale-105"
                  onClick={resetGame}
                >
                  🔄 再试一次
                </button>
              </div>
            )}

            <div className="grid grid-cols-4 grid-rows-4 gap-[15px] bg-gradient-to-br from-board-bg to-[#9d8b7e] p-[15px] rounded-xl w-full aspect-square md:gap-[12px] md:p-[12px] sm:gap-[10px] sm:p-[10px] xs:gap-[8px] xs:p-[8px] shadow-board">
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

          {/* Evolution legend - show below board on large screens, keep at bottom on small */}
          <div className="mt-8 md:mt-6 sm:mt-5 xs:mt-4 lg:block hidden">
            <div className="border-t border-text-dark/20 pt-5 sm:pt-4 xs:pt-3">
              <h3 className="text-text-dark text-lg md:text-base sm:text-base xs:text-sm font-bold mb-4 sm:mb-3 xs:mb-2 text-center drop-shadow">
                📖 进化图鉴
              </h3>
              <div className="grid grid-cols-4 gap-3 md:gap-2.5 sm:grid-cols-3 sm:gap-2 xs:grid-cols-2 xs:gap-1.5">
                {emojiLegend.map((item) => (
                  <div key={item.value} className="flex flex-col items-center p-2 md:p-1.5 sm:p-1.5 xs:p-1 bg-gradient-to-br from-board-bg/20 to-board-bg/10 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 transform">
                    <span className="text-2xl md:text-xl sm:text-lg xs:text-base mb-1 drop-shadow">{item.emoji}</span>
                    <span className="text-text-dark font-bold text-xs md:text-[11px] sm:text-[10px] xs:text-[9px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Scores and Instructions */}
        <div className="flex-1 lg:min-w-[300px] space-y-6">
          {/* Scores */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-board-bg to-[#9d8b7e] p-6 md:p-5 sm:p-4 xs:p-3 rounded-xl shadow-score">
              <div className="text-score-label text-sm font-bold uppercase mb-2">📊 分数</div>
              <div className="text-white text-5xl md:text-4xl sm:text-3xl xs:text-2xl font-bold drop-shadow">{gameState.score}</div>
            </div>
            <div className="bg-gradient-to-br from-board-bg to-[#9d8b7e] p-6 md:p-5 sm:p-4 xs:p-3 rounded-xl shadow-score">
              <div className="text-score-label text-sm font-bold uppercase mb-2">🏆 最高分</div>
              <div className="text-white text-5xl md:text-4xl sm:text-3xl xs:text-2xl font-bold drop-shadow">{bestScore}</div>
            </div>
          </div>

          {/* New Game Button */}
          <button 
            className="w-full bg-gradient-to-br from-button-bg to-[#7a6655] text-text-light border-none rounded-xl px-6 py-4 text-xl md:text-lg sm:text-base xs:text-sm font-bold cursor-pointer transition-all duration-200 hover:from-button-hover hover:to-[#8b7766] shadow-button hover:shadow-button-hover transform hover:scale-105 hover:-translate-y-0.5" 
            onClick={resetGame}
          >
            🎮 新游戏
          </button>

          {/* Game Description */}
          <div className="bg-gradient-to-br from-board-bg/10 to-board-bg/5 p-6 md:p-5 sm:p-4 xs:p-3 rounded-xl shadow-md">
            <p className="text-text-dark text-lg md:text-base sm:text-sm xs:text-xs m-0 drop-shadow leading-relaxed">
              ✨ 合并 Emoji，合成<strong>大草莓！🍓</strong>
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-board-bg/10 to-board-bg/5 p-6 md:p-5 sm:p-4 xs:p-3 rounded-xl shadow-md">
            <h3 className="text-text-dark text-xl md:text-lg sm:text-base xs:text-sm font-bold mb-3 drop-shadow">
              🎯 玩法说明
            </h3>
            <p className="text-text-dark text-base md:text-sm sm:text-sm xs:text-xs m-0 drop-shadow leading-relaxed">
              使用 <strong>⌨️ 方向键</strong> 移动方块。
              当两个相同的 Emoji 相遇时，它们会 <strong>✨ 合并成一个新的！</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Evolution legend for small screens - show at bottom */}
      <div className="mt-8 md:mt-6 sm:mt-5 xs:mt-4 lg:hidden">
        <div className="border-t border-text-dark/20 pt-5 sm:pt-4 xs:pt-3">
          <h3 className="text-text-dark text-lg md:text-base sm:text-base xs:text-sm font-bold mb-4 sm:mb-3 xs:mb-2 text-center drop-shadow">
            📖 进化图鉴
          </h3>
          <div className="grid grid-cols-4 gap-3 md:gap-2.5 sm:grid-cols-3 sm:gap-2 xs:grid-cols-2 xs:gap-1.5">
            {emojiLegend.map((item) => (
              <div key={item.value} className="flex flex-col items-center p-2 md:p-1.5 sm:p-1.5 xs:p-1 bg-gradient-to-br from-board-bg/20 to-board-bg/10 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 transform">
                <span className="text-2xl md:text-xl sm:text-lg xs:text-base mb-1 drop-shadow">{item.emoji}</span>
                <span className="text-text-dark font-bold text-xs md:text-[11px] sm:text-[10px] xs:text-[9px]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
