import React from 'react';
import { InputBox } from '../input-box/InputBox';

import style from './field.module.css';
import { cls } from '../../../utils/classes';
import { InputProps } from '../input.model';

interface Props extends InputProps {
  type?: 'text' | 'number' | 'email';
}

export const Field: React.FC<Props> = ({ type, label, error, ...inputProps }: Props) => {
  return (
    <InputBox label={label} error={error}>
      <input
        data-testid="input"
        type={type ?? 'text'}
        className={cls([style.input, error && style.__error])}
        {...inputProps}
      />
    </InputBox>
  );
};
