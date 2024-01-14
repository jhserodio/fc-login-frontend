import { LOGIN_MUTATION } from '../../service/gql/login.mutation';
import { LoginResponse } from '../../service/interfaces/login.model';
import { useMutation } from '../../service/useMutation';

const LoginComponent = () => {
  const { data, error, loading, mutate } = useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleLogin = () => {
    mutate({
      identifier: 'test@freshcells.de',
      password: 'KTKwXm2grV4wHzW',
    });
  };

  console.log('error -> ', error);
  console.log('data -> ', data);
  console.log('loading -> ', loading);

  return (
    <div>
      Login
      {loading ? 'carregando' : 'paradis'}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
