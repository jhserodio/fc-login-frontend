// src/component/hint/Hint.tsx
import React from 'react';
import style from './hint.module.css';
import { cls } from '../../utils/classes';

type Status = 'error' | 'success' | 'info' | 'default';

export interface HintProps {
  status: Status;
  children: React.ReactNode;
}

export const Hint: React.FC<HintProps> = ({ status, children }) => (
  <div className={cls([style.hint, style[status]])}>{children}</div>
);
