import { fr, enUS } from 'date-fns/locale';

export const DEFAULT_FORMAT = 'dd/LL/yyyy';

const availableLocales: Record<string, Locale> = {
  fr,
  en: enUS
};

export const getLocale = (locale?: string): Locale | undefined => {
  if (locale) {
    const lng = Object.keys(availableLocales).find(
      key => key === locale.substring(0, 2)
    );
    if (lng) {
      return availableLocales[lng];
    }
  }
};
