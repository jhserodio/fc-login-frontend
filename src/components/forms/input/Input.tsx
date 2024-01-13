import React, { ChangeEvent } from 'react';
import { Field } from '../field-box/Field';

import style from './input.module.css';
import { cls } from '../../../utils/classes';

interface Props {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  error?: string;
}

export const Input: React.FC<Props> = ({ value, onChange, label, error, type }) => {
  return (
    <Field label={label} error={error}>
      <input
        data-testid="input"
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        className={cls([style.input, error && style.__error])}
      />
    </Field>
  );
};
