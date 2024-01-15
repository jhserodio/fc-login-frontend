import { ReactNode, MouseEventHandler } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useQuery } from '../../hooks/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { clearJwtToken } from '../../utils/local-storage';
import UserComponent from './User';

jest.mock('i18next', () => ({
  t: jest.fn((key) => key),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/useQuery', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../components/background', () => ({
  Background: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../components/container', () => ({
  Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../components/buttons', () => ({
  Btn: ({ children, onClick }: { children: ReactNode; onClick: MouseEventHandler }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock('../../components/error', () => ({
  Fallback: ({ message }: { message: string }) => <div data-testid="fallback">{message}</div>,
}));

jest.mock('../../components/texts', () => ({
  Title: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
  Paragraph: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

jest.mock('../../utils/local-storage', () => ({
  clearJwtToken: jest.fn(),
  getJwtToken: jest.fn(),
}));

describe('UserComponent', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  (useParams as jest.Mock).mockReturnValue({ userId: '1' });
  (useQuery as jest.Mock).mockReturnValue({
    data: { user: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' } },
    error: null,
    loading: false,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user data', () => {
    const { getByText } = render(<UserComponent />);
    expect(getByText('user.list.firstName')).toBeDefined();
    expect(getByText('user.list.lastName')).toBeDefined();
    expect(getByText('user.list.email')).toBeDefined();

    const button = getByText('user.logout');
    fireEvent.click(button);
    expect(clearJwtToken).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate when logout button is clicked', () => {
    const { getByText } = render(<UserComponent />);

    const button = getByText('user.logout');
    fireEvent.click(button);
    expect(clearJwtToken).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should render error when request return error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { message: 'error message' },
      loading: false,
    });

    const { getByTestId } = render(<UserComponent />);

    const fallback = getByTestId('fallback');
    expect(fallback).toBeDefined();
  });
});
