import React, { ChangeEvent } from 'react';
import { InputBox } from '../input-box/InputBox';

import style from './field.module.css';
import { cls } from '../../../utils/classes';

interface Props {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'email';
  error?: string;
}

export const Field: React.FC<Props> = ({ value, onChange, label, error, type }) => {
  return (
    <InputBox label={label} error={error}>
      <input
        data-testid="input"
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        className={cls([style.input, error && style.__error])}
      />
    </InputBox>
  );
};
