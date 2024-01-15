import { ChangeEvent, FocusEvent } from 'react';

export interface InputProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}
