import { useState } from 'react';
import { gqlFetch } from '../service/gql-fetch';

export const useMutation = <T>(mutation: string) => {
  const [resp, setResp] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (variables: Record<string, unknown>) => {
    setLoading(true);
    try {
      const responseData = await gqlFetch<T>(mutation, variables);
      setResp(responseData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, resp, error, loading };
};
