import React from 'react';
import style from './title.module.css';
import { cls } from '../../../utils/classes';

type TitleProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  captalize?: boolean;
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ level, captalize, children }) => {
  const Tag = level;

  return <Tag className={cls([style.title, captalize ? style.__captalize : ''])}>{children}</Tag>;
};
