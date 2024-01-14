export interface LoginResponse {
  data: {
    login: {
      jwt: string;
      user: {
        id: string;
      };
    };
  };
}
