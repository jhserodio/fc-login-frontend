import React, { ReactNode } from 'react';
import styles from './background.module.css';

interface BackgroundProps {
  children: ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
