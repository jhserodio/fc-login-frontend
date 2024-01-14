import { render, fireEvent } from '@testing-library/react';
import { Password } from './Password';
import { ReactNode } from 'react';

jest.mock('../../buttons/btn-icon/BtnIcon', () => ({
  BtnIcon: ({ children, onClick }: { children: ReactNode; onClick: VoidFunction }) => (
    <button data-testid="toggle" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock('../input/Input', () => ({
  Input: ({ type, children }: { type?: string; children: ReactNode }) => (
    <div>
      <input data-testid="input" value="" onChange={jest.fn()} onBlur={jest.fn()} type={type} />
      {children}
    </div>
  ),
}));

describe('Password', () => {
  const mockOnChange = jest.fn();

  it('should render without error', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} />,
    );
    expect(getByTestId('input')).toBeDefined();
  });

  it('should toggle password type when toggle button is clicked', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} />,
    );
    const toggleButton = getByTestId('toggle');
    const password = getByTestId('input');
    expect(password.getAttribute('type')).toBe('password');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('text');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('password');
  });
});
