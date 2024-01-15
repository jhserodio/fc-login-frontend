import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';
import { ChangeEvent, FocusEvent } from 'react';

describe('useForm', () => {
  it('should handle value change', () => {
    const { result } = renderHook(() => useForm('test', true, []));

    act(() => {
      result.current.input.onChange({
        target: { value: 'new value' },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.input.value).toBe('new value');
  });

  it('should validate input on blur', () => {
    const validateFn = jest.fn();
    const { result } = renderHook(() => useForm('test', true, [validateFn]));

    act(() => {
      result.current.input.onBlur({
        target: { value: 'new value' },
      } as FocusEvent<HTMLInputElement>);
    });

    expect(validateFn).toHaveBeenCalledWith('new value');
  });

  it('should validate input when check is called', () => {
    const validateFn = jest.fn();
    const { result } = renderHook(() => useForm('test', true, [validateFn]));

    act(() => {
      result.current.validate.check();
    });

    expect(validateFn).toHaveBeenCalledWith('');
  });

  it('should set error when validation fails', () => {
    const validateFn = jest.fn().mockReturnValue('error message');
    const { result } = renderHook(() => useForm('test', true, [validateFn]));

    act(() => {
      result.current.validate.check();
    });

    expect(result.current.validate.error).toBe('error message');
  });

  it('should set error when validation fails and check again to clear error', () => {
    const validateFn = jest.fn().mockReturnValue('error message');
    const { result } = renderHook(() => useForm('test', true, [validateFn]));

    act(() => {
      result.current.validate.check();
    });

    expect(result.current.validate.error).toBe('error message');

    validateFn.mockReturnValue('');
    act(() => {
      result.current.validate.check();
    });

    expect(result.current.validate.error).toBe('');
  });
});
