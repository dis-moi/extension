import { fr, enUS } from 'date-fns/locale';
import { DEFAULT_LANGUAGE } from './config';

export const DEFAULT_FORMAT = 'dd/LL/yyyy';

const availableLocales: Record<string, Locale> = {
  fr,
  [DEFAULT_LANGUAGE]: enUS
};

export const getLocale = (locale?: string): Locale => {
  if (locale) {
    const localeKey = Object.keys(availableLocales).find(
      key => key === locale.substring(0, 2)
    );
    if (localeKey) {
      return availableLocales[localeKey];
    }
  }

  return availableLocales[DEFAULT_LANGUAGE];
};
