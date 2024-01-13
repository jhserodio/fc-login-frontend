import React from 'react';
import styles from './paragraph.module.css';

interface ParagraphProps {
  children: string | string[];
}

export const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  const P = ({ children }: { children: string }) => <p className={styles.paragraph}>{children}</p>;

  if (typeof children === 'string') {
    return <P>{children}</P>;
  }

  return (
    <>
      {children.map((text, index) => (
        <p key={index} className={styles.paragraph}>
          {text}
        </p>
      ))}
    </>
  );
};
