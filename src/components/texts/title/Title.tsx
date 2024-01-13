import React from 'react';
import style from './title.module.css';

type TitleProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ level, children }) => {
  const Tag = level;

  return <Tag className={style.title}>{children}</Tag>;
};
