import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  render(<App />);
  const element = screen.getByText(/zupko/i);
  expect(element).toBeInTheDocument();
});
