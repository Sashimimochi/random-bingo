import { render, screen } from '@testing-library/react';
import App from './App';

test('renders random bingo application', () => {
  render(<App />);
  const titleElement = screen.getByText(/ランダム封印縛りビンゴ/i);
  expect(titleElement).toBeInTheDocument();
});
