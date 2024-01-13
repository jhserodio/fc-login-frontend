import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { ReactNode } from 'react';

jest.mock('../field-box/Field', () => ({
  Field: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Input', () => {
  it('should render correctly with default type', () => {
    const onChange = jest.fn();
    const wrap = render(<Input label="Test Label" value="Test Value" onChange={onChange} />);

    expect(wrap.getByTestId('input')).toBeDefined();
    expect(wrap.getByTestId('input').getAttribute('type')).toBe('text');
  });

  it('should render correctly with error', () => {
    const onChange = jest.fn();
    const wrap = render(
      <Input label="Test Label" value="Test Value" onChange={onChange} error="Test Error" />,
    );

    expect(wrap.container.querySelector('.__error')).toBeDefined();
  });

  it('should call onChange when input changes', () => {
    const onChange = jest.fn();
    const wrap = render(<Input label="Test Label" value="Test Value" onChange={onChange} />);

    fireEvent.change(wrap.getByTestId('input'), {
      target: { value: 'New Value' },
    });

    expect(onChange).toHaveBeenCalled();
  });
});
