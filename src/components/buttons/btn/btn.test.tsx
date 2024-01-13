import { render, fireEvent } from '@testing-library/react';
import { Btn } from './Btn';

describe('Btn', () => {
  it('renders without crashing', () => {
    render(<Btn onClick={() => {}}>carambolas</Btn>);
  });

  it('renders the children correctly', () => {
    const { getByText } = render(<Btn onClick={() => {}}>Click me</Btn>);
    expect(getByText('Click me')).toBeDefined();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Btn onClick={onClickMock}>Click me</Btn>);
    fireEvent.click(getByText('Click me'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
