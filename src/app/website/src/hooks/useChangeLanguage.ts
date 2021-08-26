import { useEffect } from 'react';
import i18n, { SupportedLanguage } from 'libs/i18n';

const useChangeLanguage = (locale: SupportedLanguage) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);
};
export default useChangeLanguage;
