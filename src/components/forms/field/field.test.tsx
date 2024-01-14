import { render, fireEvent } from '@testing-library/react';
import { Field } from './Field';
import { ReactNode } from 'react';

jest.mock('../input-box/InputBox', () => ({
  InputBox: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Field', () => {
  it('should render correctly with default type', () => {
    const onChange = jest.fn();
    const wrap = render(
      <Field name="email" label="Test Label" value="Test Value" onChange={onChange} />,
    );

    expect(wrap.getByTestId('input')).toBeDefined();
    expect(wrap.getByTestId('input').getAttribute('type')).toBe('text');
  });

  it('should render correctly with custom type', () => {
    const onChange = jest.fn();
    const wrap = render(
      <Field
        name="email"
        type="number"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />,
    );

    expect(wrap.getByTestId('input')).toBeDefined();
    expect(wrap.getByTestId('input').getAttribute('type')).toBe('number');
  });

  it('should render correctly with error', () => {
    const onChange = jest.fn();
    const wrap = render(
      <Field
        name="email"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
        error="Test Error"
      />,
    );

    expect(wrap.container.querySelector('.__error')).toBeDefined();
  });

  it('should call onChange when input changes', () => {
    const onChange = jest.fn();
    const wrap = render(
      <Field name="email" label="Test Label" value="Test Value" onChange={onChange} />,
    );

    fireEvent.change(wrap.getByTestId('input'), {
      target: { value: 'New Value' },
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const wrap = render(
      <Field
        name="email"
        label="Test Label"
        value="Test Value"
        onChange={jest.fn()}
        onBlur={onBlur}
      />,
    );

    fireEvent.blur(wrap.getByTestId('input'));

    expect(onBlur).toHaveBeenCalled();
  });
});
