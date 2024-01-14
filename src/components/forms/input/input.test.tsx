import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import * as classes from '../../../utils/classes';
import { ReactNode } from 'react';

// Mock da função cls
jest.mock('../../../utils/classes', () => ({
  cls: jest.fn().mockReturnValue('mocked_className'),
}));

jest.mock('../input-box/InputBox', () => ({
  InputBox: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../buttons/btn-icon/BtnIcon', () => ({
  BtnIcon: ({ children, onClick }: { children: ReactNode; onClick: VoidFunction }) => (
    <button data-testid="toggle" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('Input', () => {
  const mockOnChange = jest.fn();

  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
    mockOnChange.mockClear();
  });

  it('should render without error', () => {
    const { getByTestId } = render(
      <Input type="text" name="default" label="Input" value="" onChange={mockOnChange} />,
    );
    expect(getByTestId('input')).toBeDefined();
  });

  it('should call onChange when password value changes', () => {
    const { getByTestId } = render(
      <Input type="text" name="default" label="Input" value="" onChange={mockOnChange} />,
    );
    fireEvent.change(getByTestId('input'), { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    const mockOnBlur = jest.fn();

    const { getByTestId } = render(
      <Input
        type="text"
        name="default"
        label="Input"
        value=""
        onBlur={mockOnBlur}
        onChange={jest.fn()}
      />,
    );
    fireEvent.blur(getByTestId('input'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should apply error style when error prop is provided', () => {
    render(
      <Input
        type="text"
        name="default"
        label="Input"
        value=""
        onChange={mockOnChange}
        error="Error message"
      />,
    );
    expect(clsSpy.mock.lastCall[0].length).toBe(2);
  });
});
