import { render, fireEvent, act } from '@testing-library/react';
import { Snackbar } from './Snackbar';

jest.mock('../buttons', () => ({
  BtnIcon: jest.fn(({ onClick }) => <button onClick={onClick} data-testid="mockedBtnIcon" />),
}));

jest.mock('../icons', () => ({
  Icon: jest.fn(() => <span data-testid="mockedIcon" />),
}));

jest.mock('../../utils/classes', () => ({
  cls: jest.fn((classes) => classes.join(' ')),
}));

describe('Snackbar', () => {
  it('should render', () => {
    const { getByTestId } = render(<Snackbar status="error" message="anything" />);
    expect(getByTestId('snackbar')).toBeDefined();
  });

  it('renders the message correctly', () => {
    const { getByText } = render(<Snackbar status="error" message="anything" />);
    expect(getByText('anything')).toBeDefined();
  });

  it('calls handleClose when BtnIcon is clicked', () => {
    const { getByTestId } = render(<Snackbar status="error" message="anything" />);
    fireEvent.click(getByTestId('mockedBtnIcon'));
    expect(getByTestId('snackbar').className).toContain('closed');
  });

  it('automatically closes after 3 seconds', async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Snackbar status="error" message="anything" />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByTestId('snackbar').className).toContain('closed');
    jest.useRealTimers();
  });
});
