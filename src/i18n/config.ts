import en from './locales/en.json';
import de from './locales/de.json';

const i18nInitConfig = {
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: en,
    },
    es: {
      translations: de,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
};

export default i18nInitConfig;
