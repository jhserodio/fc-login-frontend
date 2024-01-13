import { useState, ChangeEvent, useCallback } from 'react';
import { InputBox } from '../input-box/InputBox';

import style from './password.module.css';
import { cls } from '../../../utils/classes';

interface Props {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Password = ({ value, onChange, label, error }: Props) => {
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleChangeType = useCallback(() => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }, [type]);

  return (
    <InputBox label={label} error={error}>
      <input
        data-testid="input"
        type={type}
        value={value}
        onChange={onChange}
        className={cls([style.input, error && style.__error])}
      />
      <button
        data-testid="toggle"
        type="button"
        className={style.toggle}
        onClick={handleChangeType}
      >
        {type === 'password' ? 'show' : 'hide'}
      </button>
    </InputBox>
  );
};
