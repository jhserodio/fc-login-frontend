export interface LoginResponse {
  login: {
    jwt: string;
    user: {
      id: string;
    };
  };
}
