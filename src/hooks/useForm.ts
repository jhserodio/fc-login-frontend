import { useState, ChangeEvent, FocusEvent } from 'react';

type Input = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  required: boolean;
};

type ValidationFunction = (value: string) => string | undefined;

type Validate = {
  error: string | undefined;
  check: () => void;
};

type UseFormOutput = {
  input: Input;
  validate: Validate;
};

export const useForm = (
  name: string,
  required: boolean,
  validates: ValidationFunction[],
): UseFormOutput => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    validateInput(event.target.value);
  };

  const validateInput = (inputValue?: string) => {
    let error: string | undefined;
    for (const validateFn of validates) {
      error = validateFn(inputValue ?? value);
      if (error) {
        setError(error);
        break;
      } else {
        setError('');
      }
    }
  };

  return {
    input: {
      name,
      value,
      required,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    validate: {
      check: validateInput,
      error,
    },
  };
};
