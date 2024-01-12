import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: jest.fn(() => ({ t: jest.fn((a: string) => a) })),
}));

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
