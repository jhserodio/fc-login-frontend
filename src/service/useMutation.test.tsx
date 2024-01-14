import { renderHook, act, waitFor } from '@testing-library/react';
import { useMutation } from './useMutation';
import * as fetch from './gql-fetch';

describe('useMutation', () => {
  const gqlFetch: jest.SpyInstance = jest.spyOn(fetch, 'gqlFetch');

  beforeEach(() => {
    gqlFetch.mockClear();
  });

  it('should fetch data successfully', async () => {
    gqlFetch.mockResolvedValue({ test: 'test data' });
    const { result } = renderHook(() => useMutation<{ test: string }>('mutation'));

    act(() => {
      result.current.mutate({});
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({ test: 'test data' });
      expect(result.current.error).toBe(null);
    });
  });

  it('should handle error', async () => {
    const mockedError = new Error('test error');

    gqlFetch.mockRejectedValue(mockedError);
    const { result } = renderHook(() => useMutation<{ test: string }>('mutation'));

    act(() => {
      result.current.mutate({});
    });

    await waitFor(() => {
      expect(result.current.error).toEqual(mockedError);
    });
  });
});
