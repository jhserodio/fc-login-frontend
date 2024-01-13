import style from './field.module.css';
import { Hint } from '../../hint/Hint';

export const Field = ({
  error,
  label,
  children,
}: {
  error?: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div className={`${style.field} ${error && style.__error}`}>
    <label className={style.label}>{label}</label>
    {children}
    {error ? <Hint status="error">{error}</Hint> : ''}
  </div>
);
