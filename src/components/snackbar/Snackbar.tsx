import { FC, useEffect, useState } from 'react';
import { cls } from '../../utils/classes';
import style from './snackbar.module.css';
import { BtnIcon } from '../buttons';
import { Icon } from '../icons';

type SnackbarStatus = 'warn' | 'error' | 'info' | 'ok' | 'closed';

export interface SnackbarProps {
  status: SnackbarStatus;
  message: string;
}

const Snackbar: FC<SnackbarProps> = ({ status, message }) => {
  const [innerStatus, setInnerStatus] = useState<SnackbarStatus>('closed');

  const handleClose = () => setInnerStatus('closed');

  useEffect(() => {
    if (status !== 'closed') {
      setInnerStatus(status);
      setTimeout(() => {
        setInnerStatus('closed');
      }, 3000);
    }
  }, [status]);

  return (
    <div data-testid="snackbar" className={cls([style.snackbar, style[`__${innerStatus}`]])}>
      <span className={style.content}>{message}</span>
      <BtnIcon onClick={handleClose} data-testid="btn">
        <Icon name="close" />
      </BtnIcon>
    </div>
  );
};

export { Snackbar };
