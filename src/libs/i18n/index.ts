import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import format from './format';

export type SupportedLanguage = 'fr' | 'en' | 'br';
export const fallbackLng = 'en' as SupportedLanguage;
export const defaultLng = 'fr' as SupportedLanguage;
export const getCurrentLng = () => i18n.language as SupportedLanguage;

export const options = {
  resources,
  detection: {
    caches: []
  },
  fallbackLng,
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
