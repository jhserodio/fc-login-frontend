import { ChangeEvent } from 'react';

export interface InputProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}
