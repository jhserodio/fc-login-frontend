const GET_USER_QUERY = `
  query user($id: Int!) {
    user(id: $id) {
      email
      firstName
      lastName
    }
  }
`;

export default GET_USER_QUERY;
