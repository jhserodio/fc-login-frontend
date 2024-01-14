import { useEffect, useState } from 'react';
import { gqlFetch } from '../service/gql-fetch';

export const useQuery = <T>(
  query: string,
  variables: Record<string, unknown>,
): { data: T | undefined; error: Error | undefined; loading: boolean } => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const responseData = await gqlFetch<T>(query, variables);
        setData(responseData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, variables]);

  return { data, error, loading };
};
