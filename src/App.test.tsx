import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /合成大草莓/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders game instructions', () => {
  render(<App />);
  const instructionsElement = screen.getByText(/玩法说明/i);
  expect(instructionsElement).toBeInTheDocument();
});

test('renders new game button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/新游戏/i);
  expect(buttonElement).toBeInTheDocument();
});
