import { useState } from 'react';
import { t } from 'i18next';

import { BtnSubmit } from '../../components/buttons/btn-submit/BtnSubmit';
import { Container } from '../../components/container/Container';
import { Form, Password } from '../../components/forms';
import { Field } from '../../components/forms/field/Field';
import { LOGIN_MUTATION } from '../../service/gql/login.mutation';
import { LoginResponse } from '../../service/interfaces/login.model';
import { useMutation } from '../../service/useMutation';
import style from './login.module.css';
import ErrorBoundary from '../../components/error/Error';
import { isEmail, isRequired } from '../../utils/validate';
import { Title } from '../../components/texts';
import { Background } from '../../components/background/Background';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { data, error, loading, mutate } = useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleLogin = async () => {
    await mutate({
      identifier: 'test@freshcells.de',
      password: 'KTKwXm2grV4wHzW',
    });

    console.log(data);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  if (error) return <ErrorBoundary message="Login Page has a error" />;

  return (
    <Background>
      <main className={style.login}>
        <header className={style.head}>
          <Title level="h2">{t('login.title')}</Title>
        </header>
        <div className={style.content}>
          <Container>
            <span>
              <Title level="h3">{t('login.subtitle')}</Title>
            </span>
            <div className={style.container}>
              <Form submit={handleLogin}>
                <Field
                  label={t('login.form.email')}
                  value={email}
                  onChange={handleEmail}
                  error={isEmail(email)}
                  type="email"
                />
                <Password
                  label={t('login.form.password')}
                  value={pass}
                  onChange={handlePass}
                  error={isRequired(pass)}
                />
                <BtnSubmit loading={loading}>{t('login.form.submit')}</BtnSubmit>
              </Form>
            </div>
          </Container>
        </div>
      </main>
    </Background>
  );
};

export default LoginComponent;
