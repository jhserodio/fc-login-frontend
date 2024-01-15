import { gqlFetch } from './gql-fetch';
import { gql_host } from './hosts';

global.fetch = jest.fn();

describe('gqlFetch', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch data successfully', async () => {
    const mockData = { data: { test: 'test data' } };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const data = await gqlFetch<{ test: string }>('query', {});
    expect(data).toEqual(mockData.data);
    expect(fetch).toHaveBeenCalledWith(gql_host, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query',
        variables: {},
      }),
    });
  });

  it('should throw an error when fetch fails', async () => {
    const mockData = { errors: [{ message: 'Error message' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await expect(gqlFetch('query', {})).rejects.toThrow('Error message');
  });
});
