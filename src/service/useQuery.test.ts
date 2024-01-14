import { renderHook, waitFor } from '@testing-library/react';
import { useQuery } from './useQuery';
import * as fetch from './gql-fetch';

describe('useGqlFetch', () => {
  const gqlFetch: jest.SpyInstance = jest.spyOn(fetch, 'gqlFetch');

  beforeEach(() => {
    gqlFetch.mockClear();
  });

  it('should fetch data successfully', async () => {
    gqlFetch.mockResolvedValue({ test: 'test data' });
    const { result } = renderHook(() => useQuery<{ test: string }>('query', {}));

    await waitFor(() => {
      expect(result.current.data).toEqual({ test: 'test data' });
      expect(result.current.error).toBe(undefined);
    });
  });

  it('should handle error', async () => {
    const mockedError = new Error('test error');

    gqlFetch.mockRejectedValue(mockedError);
    const { result } = renderHook(() => useQuery<{ test: string }>('query', {}));

    await waitFor(() => {
      expect(result.current.error).toEqual(mockedError);
    });
  });
});
