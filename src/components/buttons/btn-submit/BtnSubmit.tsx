import React, { ReactNode } from 'react';
import styles from './btn-submit.module.css';
import { Icon } from '../../icons';

type BtnProps = {
  children: ReactNode;
  loading?: boolean;
};

export const BtnSubmit: React.FC<BtnProps> = ({ children, loading }) => {
  return (
    <button className={styles.btn} type="submit">
      {!loading ? (
        children
      ) : (
        <span className={styles.load}>
          <Icon name="spining" fill="var(--primary)" />
        </span>
      )}
    </button>
  );
};
