import { InputBox } from '../input-box/InputBox';

import style from './input.module.css';
import { cls } from '../../../utils/classes';
import { InputProps } from '../input.model';

interface Props extends InputProps {
  type: 'password' | 'text' | 'email' | 'number';
  children?: React.ReactNode;
}

export const Input = ({ label, error, children, ...inputProps }: Props) => {
  return (
    <InputBox label={label} error={error}>
      <div className={style.wrap}>
        <input
          data-testid="input"
          className={cls([style.input, error && style.__error, children && style.__withChildren])}
          {...inputProps}
        />
        {children}
      </div>
    </InputBox>
  );
};
