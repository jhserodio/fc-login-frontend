import { render, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useMutation } from '../../hooks/useMutation';
import { putJwtToken } from '../../utils/local-storage';
import LoginComponent from './Login';
import { FormEvent } from 'react';

jest.mock('i18next', () => ({
  t: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

jest.mock('../../hooks/useMutation', () => ({
  useMutation: jest.fn(),
}));

jest.mock('../../utils/local-storage', () => ({
  putJwtToken: jest.fn(),
}));

jest.mock('../../components/buttons', () => ({
  BtnSubmit: () => (
    <button data-testid="submit" type="submit">
      submit
    </button>
  ),
}));

jest.mock('../../components/container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../components/forms', () => ({
  Form: ({
    children,
    submit,
  }: {
    children: React.ReactNode;
    submit: (e: FormEvent<HTMLFormElement>) => void;
  }) => <form onSubmit={submit}>{children}</form>,
  Field: () => <input />,
  Password: () => <input />,
}));

jest.mock('../../components/texts', () => ({
  Title: () => <h1>title</h1>,
}));

jest.mock('../../components/background', () => ({
  Background: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../components/snackbar', () => ({
  Snackbar: ({ status, message }: { status: string; message: string }) => (
    <div data-testid="snackbar">
      <span>{status}</span>
      <span>{message}</span>
    </div>
  ),
}));

describe('LoginComponent', () => {
  const mockEmail = {
    input: {
      value: 'test@test.com',
      name: 'email',
      type: 'email',
      required: true,
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    validate: { check: jest.fn(), error: false },
  };

  const mockPass = {
    input: {
      value: 'password',
      name: 'pass',
      type: 'password',
      required: true,
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    validate: { check: jest.fn(), error: false },
  };

  const mockNavigate = jest.fn();
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValueOnce(mockEmail).mockReturnValueOnce(mockPass);
    mockNavigate.mockClear();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should validate inputs and submit form', async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      resp: null,
      error: null,
      loading: false,
      mutate: mockMutate,
    });

    const { getByTestId } = render(<LoginComponent />);
    const submitButton = getByTestId('submit');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockEmail.validate.check).toHaveBeenCalled();
      expect(mockPass.validate.check).toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledWith({
        identifier: mockEmail.input.value,
        password: mockPass.input.value,
      });
    });
  });

  it('should handle successful mutation', async () => {
    const mockResp = { login: { jwt: 'jwt', user: { id: 'id' } } };
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      resp: mockResp,
      error: null,
      loading: false,
      mutate: mockMutate,
    });

    render(<LoginComponent />);

    await waitFor(() => {
      expect(putJwtToken).toHaveBeenCalledWith(mockResp.login.jwt);
      expect(mockNavigate).toHaveBeenCalledWith(`/user/${mockResp.login.user.id}`);
    });
  });

  it('should handle mutation error', async () => {
    (useForm as jest.Mock).mockReturnValueOnce(mockEmail).mockReturnValueOnce(mockPass);

    const mockError = { message: 'error' };
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      resp: null,
      error: mockError,
      loading: false,
      mutate: mockMutate,
    });

    const { getByTestId } = render(<LoginComponent />);
    const submitButton = getByTestId('submit');
    const snackbar = getByTestId('snackbar');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(snackbar.innerHTML).toContain('error');
    });
  });
});
