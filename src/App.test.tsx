import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 2048 game', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /2048/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders game instructions', () => {
  render(<App />);
  const instructionsElement = screen.getByText(/HOW TO PLAY/i);
  expect(instructionsElement).toBeInTheDocument();
});

test('renders new game button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/New Game/i);
  expect(buttonElement).toBeInTheDocument();
});
