import { isRequired, isEmail } from './validate';

jest.mock('i18next', () => ({
  t: jest.fn((key) => key),
}));

describe('Validation functions', () => {
  it('should return error message if value is not provided', () => {
    expect(isRequired('')).toBe('validate.required');
  });

  it('should not return error message if value is provided', () => {
    expect(isRequired('value')).toBeUndefined();
  });

  it('should return error message if value is not a valid email', () => {
    expect(isEmail('not a valid email')).toBe('validate.email');
  });

  it('should not return error message if value is a valid email', () => {
    expect(isEmail('email@example.com')).toBeUndefined();
  });
});
