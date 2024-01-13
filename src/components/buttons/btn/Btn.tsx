import React, { ReactNode } from 'react';
import styles from './btn.module.css';

type BtnProps = {
  onClick: () => void;
  children: ReactNode;
};

export const Btn: React.FC<BtnProps> = ({ children, onClick }) => {
  return (
    <button className={styles.btnIcon} onClick={onClick}>
      {children}
    </button>
  );
};
