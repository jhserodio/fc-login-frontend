import { FormEvent, useState } from 'react';
import { t } from 'i18next';

import { BtnSubmit } from '../../components/buttons';
import { Container } from '../../components/container';
import { Form, Field, Password } from '../../components/forms';
import { LOGIN_MUTATION } from '../../service/gql/login.mutation';
import { LoginResponse } from '../../service/interfaces/login.model';
import { useMutation } from '../../hooks/useMutation';
import style from './login.module.css';
import { isEmail, isRequired } from '../../utils/validate';
import { Title } from '../../components/texts';
import { Background } from '../../components/background';
import { Snackbar } from '../../components/snackbar';
import useForm from '../../hooks/useForm';
import { SnackbarStatus } from '../../components/snackbar/Snackbar';

const LoginComponent = () => {
  const email = useForm('email', true, [isEmail, isRequired]);
  const pass = useForm('pass', false, [isRequired]);
  const [snackbar, setSnackbar] = useState<{ message: string; status: SnackbarStatus }>({
    message: '',
    status: 'closed',
  });

  const { resp, error, loading, mutate } = useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email.validate.check();
    pass.validate.check();

    if (email.validate.error || pass.validate.error) {
      setSnackbar({ message: t('validate.invalidSubimit'), status: 'error' });
    } else {
      console.log('email', email.input.value);
      await mutate({
        identifier: email.input.value,
        password: pass.input.value,
      });

      if (error) {
        setSnackbar({ message: error.message, status: 'error' });
      } else {
        setSnackbar({ message: resp?.data.login.user.id ?? '', status: 'ok' });
      }
    }
  };

  return (
    <Background>
      <main className={style.login}>
        <div>
          <Title level="h2" captalize>
            {t('title')}
          </Title>
          <Title level="h2">{t('login.title')}</Title>
        </div>
        <div className={style.content}>
          <Container>
            <div className={style.head}>
              <Title level="h3">{t('login.subtitle')}</Title>
            </div>
            <div className={style.content}>
              <Form submit={handleSubmit}>
                <Field
                  label={t('login.form.email')}
                  type="email"
                  {...email.input}
                  error={email.validate.error}
                />
                <Password
                  label={t('login.form.password')}
                  {...pass.input}
                  error={pass.validate.error}
                />
                <div className={style.btn}>
                  <BtnSubmit loading={loading}>{t('login.form.submit')}</BtnSubmit>
                </div>
              </Form>
            </div>
          </Container>
        </div>
        <Snackbar {...snackbar} />
      </main>
    </Background>
  );
};

export default LoginComponent;
