import { useState, useCallback } from 'react';
import { BtnIcon } from '../../buttons';
import { InputProps } from '../input.model';
import { Icon } from '../../icons';
import { Input } from '../input/Input';

export const Password = (inputProps: InputProps) => {
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleChangeType = useCallback(() => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }, [type]);

  const iconFill = inputProps.error ? `var(--error)` : 'var(--primary-light)';

  return (
    <Input {...inputProps} type={type}>
      <BtnIcon onClick={handleChangeType} status={inputProps.error ? 'error' : 'default'}>
        {type === 'password' ? (
          <Icon name="show" fill={iconFill} />
        ) : (
          <Icon name="hide" fill={iconFill} />
        )}
      </BtnIcon>
    </Input>
  );
};
