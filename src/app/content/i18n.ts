import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/resources';

const options = {
  resources,
  fallbackLng: 'fr_FR',
  ns: ['extension'],
  defaultNS: 'extension',
  debug: true,
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  keySeparator: '.'
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(options);

export default i18n;
