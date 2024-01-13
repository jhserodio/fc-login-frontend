import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { InputBox } from './InputBox';

jest.mock('../../texts/hint/Hint', () => ({
  Hint: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('InputBox', () => {
  it('renders without error', () => {
    render(
      <InputBox label="Test Label">
        <div>Test Child</div>
      </InputBox>,
    );
    expect(screen.getByText('Test Label')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
  });

  it('renders with error', () => {
    render(
      <InputBox label="Test Label" error="Test Error">
        <div>Test Child</div>
      </InputBox>,
    );
    expect(screen.getByText('Test Label')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
    expect(screen.getByText('Test Error')).toBeDefined();
  });
});
