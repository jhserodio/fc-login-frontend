import { render } from '@testing-library/react';
import { Field } from './Field';

jest.mock('../input/Input', () => ({
  Input: ({ type }: { type?: string }) => (
    <div>
      <input data-testid="input" value="" onChange={jest.fn()} onBlur={jest.fn()} type={type} />
    </div>
  ),
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
});
