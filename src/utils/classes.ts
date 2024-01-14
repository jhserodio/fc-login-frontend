import { Optional } from '../types/utils';

const isClass = (str: Optional<string>): boolean => {
  if (typeof str !== 'string') {
    return false;
  }

  return /^[-_a-zA-Z0-9]+$/.test(str);
};

export const cls = (arr: Array<Optional<string>>): string => {
  return arr.filter(isClass).join(' ');
};
