English | [简体中文](./README.md)

# Snake Game - Qwik + Vite

A classic Snake game built with the Qwik framework.

## Features

- 🎮 Classic Snake gameplay
- ⌨️ Arrow key controls for movement
- ⏸️ Spacebar to pause/resume
- 📊 Real-time score tracking
- 🎯 Collision detection (walls and self)
- 🍎 Food collection and snake growth system
- 🎨 Clean and beautiful interface design

## Tech Stack

- **Qwik** - High-performance frontend framework
- **Vite** - Fast development build tool
- **TypeScript** - Type-safe JavaScript
- **CSS** - Styling

## Quick Start

### Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start playing.

### Production Build

```bash
npm run build
```

Built files will be output to the `dist` directory.

## Game Controls

- **Arrow Keys** - Control snake movement direction (up, down, left, right)
- **Spacebar** - Pause/resume game
- **Start/Restart Button** - Start a new game or restart after game over
- **Pause/Resume Button** - Pause or resume current game

## Game Rules

1. Control the snake to eat the red food
2. Each food eaten increases score by 10 points and grows the snake by one segment
3. Avoid hitting walls or your own body
4. Try to achieve the highest score possible!

## Project Structure

```
src/
├── app.tsx                 # Main app component
├── components/
│   ├── SnakeGame.tsx      # Game core logic component
│   └── SnakeGame.css      # Game styles
├── main.tsx               # App entry point
└── assets/                # Static assets

```

## About Qwik

This project uses Qwik's CSR (Client Side Rendering) mode. Learn more about Qwik at the [Qwik website](https://qwik.dev).