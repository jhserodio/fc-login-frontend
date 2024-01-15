import { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Fallback } from './Fallback';
import i18n from 'i18next';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../background', () => ({
  Background: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../container', () => ({
  Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../buttons', () => ({
  Btn: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
    <button data-testid="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('Fallback', () => {
  const tSpy = jest.spyOn(i18n, 't');

  it('should render error message', () => {
    tSpy.mockReturnValueOnce('An error has occurred: Something went wrong');

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(() => mockNavigate);

    const errorMessage = 'Something went wrong';
    const { getByText } = render(<Fallback message={errorMessage} />);
    const errorElement = getByText(`An error has occurred: ${errorMessage}`);
    expect(errorElement).toBeDefined();
  });

  it('should navigate when button is clicked', () => {
    tSpy.mockReturnValueOnce('fallback.button');

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const errorMessage = 'Something went wrong';
    const { getByTestId } = render(<Fallback message={errorMessage} />);

    const button = getByTestId('button');
    fireEvent.click(button);

    expect(mockNavigate).toBeCalledWith('/');
  });
});
