import { gql_host } from './hosts';

export async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown>,
  headers?: Headers,
): Promise<T> {
  const response = await fetch(gql_host, {
    method: 'POST',
    headers: headers ?? { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseData = await response.json();
  if (responseData.errors) {
    throw new Error(responseData.errors[0].message);
  }
  return responseData.data;
}
