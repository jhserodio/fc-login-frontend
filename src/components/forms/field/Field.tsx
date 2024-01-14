import React from 'react';
import { InputProps } from '../input.model';
import { Input } from '../input/Input';

interface Props extends InputProps {
  type?: 'text' | 'number' | 'email';
}

export const Field: React.FC<Props> = ({ type, ...inputProps }: Props) => {
  return <Input type={type ?? 'text'} {...inputProps} />;
};
