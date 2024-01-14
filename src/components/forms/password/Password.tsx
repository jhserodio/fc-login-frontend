import { useState, useCallback } from 'react';
import { InputBox } from '../input-box/InputBox';

import style from './password.module.css';
import { cls } from '../../../utils/classes';
import { BtnIcon } from '../../buttons';
import { InputProps } from '../input.model';
import { Icon } from '../../icons';

export const Password = ({ label, error, ...inputProps }: InputProps) => {
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
        className={cls([style.input, error && style.__error])}
        {...inputProps}
      />
      <BtnIcon onClick={handleChangeType}>
        {type === 'password' ? <Icon name="show" /> : <Icon name="hide" />}
      </BtnIcon>
    </InputBox>
  );
};
