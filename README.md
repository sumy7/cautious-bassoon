# 2048 Game - React Application

A fully functional implementation of the popular 2048 puzzle game built with React and TypeScript.

## Game Features

- **Classic 2048 Gameplay**: Join numbers to reach the 2048 tile
- **Score Tracking**: Current score and best score (persisted in localStorage)
- **Keyboard Controls**: Use arrow keys to move tiles
- **Responsive Design**: Works on desktop and mobile devices
- **Win/Lose Detection**: Notifies when you win or lose
- **New Game Button**: Restart the game at any time

## How to Play

1. Use your **arrow keys** to move the tiles
2. When two tiles with the same number touch, they **merge into one**
3. The goal is to create a tile with the number **2048**
4. The game ends when no more moves are possible

## Screenshots

![2048 Game Initial State](https://github.com/user-attachments/assets/c960de3e-ffa3-404d-afb7-9711747d08ca)
![2048 Game After Move](https://github.com/user-attachments/assets/dd7ae73f-1f34-4414-9084-22851a11eb6b)

## Getting Started

This project is built with [Vite](https://vitejs.dev/).

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode using Vite.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm test`

Launches the test runner (Vitest).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Technologies Used

- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tooling

## Project Structure

```
src/
├── App.tsx           # Main application component
├── Game.tsx          # Game component with UI and logic
├── gameLogic.ts      # Core game logic (board manipulation, moves)
├── Game.css          # Game styling
├── App.css           # Application styling
└── index.tsx         # Application entry point
```

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).
