import { component$, useSignal, useVisibleTask$, $, useStore, useComputed$ } from '@builder.io/qwik';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: { x: number; y: number };
  gameOver: boolean;
  score: number;
  isPlaying: boolean;
  previousScore: number;
}

export const SnakeGame = component$(() => {
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SPEED = 150;

  const gameState = useStore<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    gameOver: false,
    score: 0,
    isPlaying: false,
    previousScore: 0,
  });

  const gameLoopRef = useSignal<number | null>(null);

  const generateFood = $(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  });

  const moveSnake = $(async () => {
    if (gameState.gameOver || !gameState.isPlaying) return;

    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };
    
    head.x += gameState.direction.x;
    head.y += gameState.direction.y;

    if (
      head.x < 0 || 
      head.x >= GRID_SIZE || 
      head.y < 0 || 
      head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      gameState.gameOver = true;
      gameState.isPlaying = false;
      return;
    }

    newSnake.unshift(head);

    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      gameState.previousScore = gameState.score;
      gameState.score += 10;
      gameState.food = await generateFood();
    } else {
      newSnake.pop();
    }

    gameState.snake = newSnake;
  });

  const startGame = $(() => {
    gameState.snake = [{ x: 10, y: 10 }];
    gameState.food = { x: 15, y: 15 };
    gameState.direction = { x: 1, y: 0 };
    gameState.gameOver = false;
    gameState.score = 0;
    gameState.previousScore = 0;
    gameState.isPlaying = true;
  });

  const pauseGame = $(() => {
    gameState.isPlaying = false;
  });

  const resumeGame = $(() => {
    if (!gameState.gameOver) {
      gameState.isPlaying = true;
    }
  });

  const scoreChanged = useComputed$(() => gameState.score !== gameState.previousScore);

  const handleKeyPress = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (gameState.isPlaying) {
        pauseGame();
      } else if (!gameState.gameOver) {
        resumeGame();
      }
      return;
    }

    if (!gameState.isPlaying || gameState.gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (gameState.direction.y === 0) {
          gameState.direction = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (gameState.direction.y === 0) {
          gameState.direction = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (gameState.direction.x === 0) {
          gameState.direction = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (gameState.direction.x === 0) {
          gameState.direction = { x: 1, y: 0 };
        }
        break;
    }
  });

  useVisibleTask$(({ cleanup }) => {
    const gameLoop = setInterval(() => {
      moveSnake();
    }, INITIAL_SPEED);
    
    gameLoopRef.value = gameLoop;

    window.addEventListener('keydown', handleKeyPress);

    cleanup(() => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyPress);
    });
  });

  return (
    <div class="snake-game">
      <div class="game-info">
        <h1>贪吃蛇游戏</h1>
        <div class="score">
          <span>分数:</span>
          <span class={`score-value ${scoreChanged.value ? 'score-increase' : ''}`}>
            {gameState.score}
          </span>
        </div>
        {gameState.gameOver && <p class="game-over">游戏结束!</p>}
        {!gameState.isPlaying && !gameState.gameOver && <p>按空格键开始/继续</p>}
        {gameState.isPlaying && <p>按空格键暂停</p>}
      </div>
      
      <div class="game-controls">
        <button onClick$={startGame}>
          {gameState.gameOver || (!gameState.isPlaying && gameState.score === 0) ? '开始游戏' : '重新开始'}
        </button>
        {!gameState.gameOver && gameState.score > 0 && (
          <button onClick$={gameState.isPlaying ? pauseGame : resumeGame}>
            {gameState.isPlaying ? '暂停' : '继续'}
          </button>
        )}
      </div>

      <div 
        class="game-board"
        style={{
          width: `${GRID_SIZE * CELL_SIZE}px`,
          height: `${GRID_SIZE * CELL_SIZE}px`,
        }}
      >
        {gameState.snake.map((segment, index) => (
          <div
            key={index}
            class="snake-segment"
            style={{
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        ))}
        <div
          class="food"
          style={{
            left: `${gameState.food.x * CELL_SIZE}px`,
            top: `${gameState.food.y * CELL_SIZE}px`,
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
          }}
        />
      </div>

      <div class="instructions">
        <h3>游戏说明</h3>
        <p>使用 <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> 方向键控制蛇的移动</p>
        <p><kbd>空格键</kbd>: 暂停/继续游戏</p>
      </div>
    </div>
  );
});