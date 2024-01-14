export const LOGIN_MUTATION = `
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
      }
    }
  }
`;
