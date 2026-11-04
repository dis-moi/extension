import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { FACET_NAME } from '@dismoi/domain';
import resources from './resources';
import format from './format';

export type SupportedLanguage = 'fr' | 'en' | 'br';
export const fallbackLng: SupportedLanguage = 'en';
export const defaultLng = 'fr' as SupportedLanguage;
export const getCurrentLng = () => i18n.language as SupportedLanguage;

export const options: InitOptions = {
  resources,
  detection: {
    caches: [],
  },
  fallbackLng,
  ns: ['extension', 'profiles', 'website'],
  defaultNS: 'extension',
  debug: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
    format,
    defaultVariables: {
      facetName: FACET_NAME,
    },
  },
  keySeparator: '.',
};

i18n.use(initReactI18next).use(LanguageDetector);

export default i18n;
