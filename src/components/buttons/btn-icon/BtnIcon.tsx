import React from 'react';
import styles from './btn-icon.module.css';
import { Icon } from '../../icons';
import { cls } from '../../../utils/classes';

type BtnProps = {
  children: React.ReactElement<typeof Icon>;
  onClick: () => void;
  status?: 'error' | 'ok' | 'warn' | 'info' | 'default' | 'reset';
};

export const BtnIcon: React.FC<BtnProps> = ({ children, onClick, status }) => {
  const statusClass = styles[`__${status ?? 'default'}`];

  return (
    <button
      className={cls([styles.btn, statusClass])}
      onClick={onClick}
      data-testid="btn-icon"
      type="button"
    >
      {children}
    </button>
  );
};
