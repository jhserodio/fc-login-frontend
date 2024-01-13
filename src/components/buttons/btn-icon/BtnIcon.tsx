import React from 'react';
import styles from './btn-icon.module.css';
import { Icon } from '../../icons';

type BtnProps = {
  children: React.ReactElement<typeof Icon>;
  onClick: () => void;
};

export const BtnIcon: React.FC<BtnProps> = ({ children, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick} data-testid="btn-icon">
      {children}
    </button>
  );
};
