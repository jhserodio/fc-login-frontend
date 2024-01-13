import React, { ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({ children, submit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(e);
      }}
    >
      {children}
    </form>
  );
};
