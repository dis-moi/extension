import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from '../../../locales/resources';

const options = {
  resources,
  detection: {
    caches: []
  },
  fallbackLng: 'en',
  ns: ['profiles'],
  defaultNS: 'profiles',
  debug: true,
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  keySeparator: '.'
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(options)
  .then(() => null)
  .catch(() => null);

export default i18n;
