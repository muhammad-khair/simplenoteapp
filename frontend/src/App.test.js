import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greetings', () => {
  render(<App />);
  const greetingElement = screen.getByText(/simplenoteapp/i);
  expect(greetingElement).toBeInTheDocument();
});
