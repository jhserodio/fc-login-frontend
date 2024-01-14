import { t } from 'i18next';

export const isRequired = (value: string) => {
  if (!value) {
    return t('validate.required');
  }
};

export const isEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return t('validate.email');
  }
};
