import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import format from './format';
import { DEFAULT_LANGUAGE } from './config';

export const options = {
  resources,
  detection: {
    caches: []
  },
  fallbackLng: DEFAULT_LANGUAGE,
  ns: ['extension', 'profiles'],
  defaultNS: 'extension',
  debug: true,
  interpolation: {
    escapeValue: false, // react already safes from xss
    format
  },
  keySeparator: '.'
};

i18n.use(initReactI18next).use(LanguageDetector);

export default i18n;
