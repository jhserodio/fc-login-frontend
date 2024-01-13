import { render, fireEvent } from '@testing-library/react';
import { Password } from './Password';
import * as classes from '../../../utils/classes';
import { ReactNode } from 'react';

// Mock da função cls
jest.mock('../../../utils/classes', () => ({
  cls: jest.fn().mockReturnValue('mocked_className'),
}));

jest.mock('../input-box/InputBox', () => ({
  InputBox: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Password', () => {
  const mockOnChange = jest.fn();

  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
    mockOnChange.mockClear();
  });

  it('should render without error', () => {
    const { getByTestId } = render(<Password label="Password" value="" onChange={mockOnChange} />);
    expect(getByTestId('input')).toBeDefined();
  });

  it('should call onChange when password value changes', () => {
    const { getByTestId } = render(<Password label="Password" value="" onChange={mockOnChange} />);
    fireEvent.change(getByTestId('input'), { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should toggle password type when toggle button is clicked', () => {
    const { getByTestId } = render(<Password label="Password" value="" onChange={mockOnChange} />);
    const toggleButton = getByTestId('toggle');
    const password = getByTestId('input');
    expect(password.getAttribute('type')).toBe('password');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('text');
    fireEvent.click(toggleButton);
    expect(password.getAttribute('type')).toBe('password');
  });

  it('should apply error style when error prop is provided', () => {
    render(<Password label="Password" value="" onChange={mockOnChange} error="Error message" />);
    expect(clsSpy.mock.lastCall[0].length).toBe(2);
  });
});
