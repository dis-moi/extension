import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { FACET_NAME } from '@dismoi/domain';
import resources from './resources';
import format from './format';
import { fallbackLng, SupportedLanguage } from './language';

export type { SupportedLanguage } from './language';
export { fallbackLng, defaultLng } from './language';

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

/**
 * Une instance par rendu, dont la langue est connue dès le premier rendu.
 *
 * Le singleton ci-dessus découvre sa langue dans le navigateur, puis en
 * change dans un effet : sur le serveur il n'en a aucune, et le HTML rendu ne
 * correspondrait pas à celui que le navigateur produit à l'hydratation. Le
 * site passe donc par cette fabrique, à laquelle le chemin de l'URL donne la
 * langue ; l'extension, elle, garde le singleton.
 */
export const createI18n = (lng: SupportedLanguage): typeof i18n => {
  const instance = i18n.createInstance();

  instance.use(initReactI18next).init({ ...options, lng });

  return instance;
};

export default i18n;
