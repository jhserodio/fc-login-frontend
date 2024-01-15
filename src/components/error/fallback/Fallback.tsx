import { t } from 'i18next';
import { Background } from '../../background';
import { Btn } from '../../buttons';
import { Container } from '../../container';
import { useNavigate } from 'react-router-dom';
import style from './fallback.module.css';
import { Title } from '../../texts';

interface Props {
  message: string;
}

export function Fallback({ message }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className={style.fallback}>
      <Background>
        <div className={style.body}>
          <Container>
            <div className={style.content}>
              <Title level="h6">{t('fallback.message', { error: message })}</Title>
              <Btn onClick={handleNavigate}>{t('fallback.button')}</Btn>
            </div>
          </Container>
        </div>
      </Background>
    </div>
  );
}
