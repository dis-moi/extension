import { fr, enUS } from 'date-fns/locale';
import { fallbackLng } from '.';

export const DEFAULT_FORMAT = 'dd/LL/yyyy';

const availableLocales: Record<string, Locale> = {
  fr: fr,
  [fallbackLng]: enUS
};

export const getLocale = (locale?: string) => {
  if (locale) {
    const lng = Object.keys(availableLocales).find(
      key => key === locale.substring(0, 2)
    );
    if (lng) {
      return availableLocales[lng];
    }
  }

  return availableLocales[fallbackLng];
};
