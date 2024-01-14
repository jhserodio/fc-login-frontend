import { InputBox } from '../input-box/InputBox';

import style from './input.module.css';
import { cls } from '../../../utils/classes';
import { InputProps } from '../input.model';

interface Props extends InputProps {
  type: 'password' | 'text' | 'email' | 'number';
  children?: React.ReactNode;
}

export const Input = ({ label, error, children: append, ...inputProps }: Props) => {
  return (
    <InputBox label={label} error={error}>
      <input
        data-testid="input"
        className={cls([style.input, error && style.__error])}
        {...inputProps}
      />
      {append}
    </InputBox>
  );
};
