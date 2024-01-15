import { render, fireEvent } from '@testing-library/react';
import { Password } from './Password';
import { ReactNode } from 'react';

jest.mock('../../buttons/btn-icon/BtnIcon', () => ({
  BtnIcon: ({
    children,
    onClick,
    status,
  }: {
    children: ReactNode;
    onClick: VoidFunction;
    status: string;
  }) => (
    <button data-testid="toggle" onClick={onClick} className={status}>
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

jest.mock('../../icons', () => ({
  Icon: ({ name, fill }: { name: string; fill: string }) => (
    <div data-testid="icon">
      <span>{name}</span>
      <span>{fill}</span>
    </div>
  ),
}));

describe('Password', () => {
  const mockOnChange = jest.fn();

  it('should render without error', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} />,
    );

    const toggleButton = getByTestId('toggle');

    expect(getByTestId('input')).toBeDefined();
    expect(toggleButton.getAttribute('class')).toContain('default');
  });

  it('should toggle password type when toggle button is clicked', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} />,
    );
    const toggleButton = getByTestId('toggle');
    const password = getByTestId('input');
    const icon = getByTestId('icon');

    expect(password.getAttribute('type')).toBe('password');
    expect(icon.children[0].innerHTML).toBe('show');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('text');
    expect(icon.children[0].innerHTML).toBe('hide');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('password');
  });

  it('should render with error', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} error="anyone" />,
    );
    const icon = getByTestId('icon');
    const toggleButton = getByTestId('toggle');
    expect(icon).toBeDefined();
    expect(icon.children[1].innerHTML).toBe('var(--error)');
    expect(toggleButton.getAttribute('class')).toContain('error');
  });

  it('should render icon with default color', () => {
    const { getByTestId } = render(
      <Password name="passwd" label="Password" value="" onChange={mockOnChange} />,
    );
    const icon = getByTestId('icon');
    expect(icon).toBeDefined();
    expect(icon.children[1].innerHTML).toBe('var(--primary-light)');
  });
});
