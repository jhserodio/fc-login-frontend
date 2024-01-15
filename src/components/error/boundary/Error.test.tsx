import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './Error';

jest.mock('../fallback/Fallback', () => ({
  Fallback: ({ message }: { message: string }) => <div>{message}</div>,
}));

// Componente simulado que lança um erro
const Bomb = () => {
  throw new Error('owwhhh nooooo');
};

describe('ErrorBoundary', () => {
  it('should render FallbackComponent when child component throws', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary message="Error Detected">
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Error Detected/i)).toBeDefined();
  });
});
