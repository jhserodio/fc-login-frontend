import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { InputBox } from './InputBox';
import * as classes from '../../../utils/classes';

jest.mock('../../texts/hint/Hint', () => ({
  Hint: ({ children }: { children: ReactNode }) => <div data-testid="hint">{children}</div>,
}));

describe('InputBox', () => {
  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
  });

  it('renders without error', () => {
    render(
      <InputBox label="Test Label">
        <div data-testid="children">Test Child</div>
      </InputBox>,
    );
    expect(screen.getByTestId('label')).toBeDefined();
    expect(screen.getByTestId('children')).toBeDefined();
  });

  it('renders with error', () => {
    render(
      <InputBox label="Test Label" error="Test Error">
        <div data-testid="children">Test Child</div>
      </InputBox>,
    );
    expect(screen.getByTestId('label')).toBeDefined();
    expect(screen.getByTestId('children')).toBeDefined();
    expect(screen.getByTestId('hint')).toBeDefined();

    expect(clsSpy).toHaveBeenCalledWith(['inputBox', '__error']);
  });
});
