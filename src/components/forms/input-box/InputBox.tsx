import style from './input-box.module.css';
import { Hint } from '../../texts/hint/Hint';
import { cls } from '../../../utils/classes';

export const InputBox = ({
  error,
  label,
  children,
}: {
  error?: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div className={cls([style.inputBox, error && style.__error])}>
    <label data-testid="label" className={style.label}>
      {label}:
    </label>
    {children}
    {error ? <Hint status="error">{error}</Hint> : ''}
  </div>
);
