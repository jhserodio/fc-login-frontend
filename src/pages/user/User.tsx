import { t } from 'i18next';
import { Background } from '../../components/background';
import { Paragraph, Title } from '../../components/texts';
import { Container } from '../../components/container';
import style from './user.module.css';
import { Btn } from '../../components/buttons';
import { useQuery } from '../../hooks/useQuery';
import GET_USER_QUERY from '../../service/gql/user.query';
import { useNavigate, useParams } from 'react-router-dom';
import { Fallback } from '../../components/error';
import { clearJwtToken, getJwtToken } from '../../utils/local-storage';
import { UserResponse } from '../../service/interfaces/user.mode';
import { useCallback } from 'react';

const UserComponent = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { data, error, loading } = useQuery<UserResponse>(
    GET_USER_QUERY,
    {
      id: Number(userId),
    },
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
  );

  const handleLogout = useCallback(() => {
    clearJwtToken();
    navigate('/');
  }, [navigate]);

  if (error) {
    return <Fallback message={error?.message as string} />;
  }

  return (
    <Background>
      <main className={style.user}>
        <div>
          <Title level="h2" captalize>
            {t('title')}
          </Title>
          <Title level="h3">{t('user.title')}</Title>
        </div>
        <Container>
          <div className={style.head}>
            <Title level="h5">{t('user.subtitle', { firstName: data?.user.firstName })}</Title>
          </div>
          <div className={style.body}>
            {loading ? (
              <div>carregando</div>
            ) : (
              <>
                <div className={style.item}>
                  <Paragraph>
                    {t('user.list.firstName', { value: data?.user?.firstName })}
                  </Paragraph>
                </div>
                <div className={style.item}>
                  <Paragraph>{t('user.list.lastName', { value: data?.user?.lastName })}</Paragraph>
                </div>
                <div className={style.item}>
                  <Paragraph>{t('user.list.email', { value: data?.user?.email })}</Paragraph>
                </div>
              </>
            )}
          </div>
          <div className={style.bottom}>
            <Btn onClick={handleLogout}>{t('user.logout')}</Btn>
          </div>
        </Container>
      </main>
    </Background>
  );
};

export default UserComponent;
