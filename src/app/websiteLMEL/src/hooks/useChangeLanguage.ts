import { useEffect } from 'react';
import i18n from 'libs/i18n';

const useChangeLanguage = (path: string) => {
  useEffect(() => {
    const en = new RegExp(/\/en\//);
    const locale = en.test(path) ? 'en' : 'fr';
    i18n.changeLanguage(locale);
  }, [path]);
};
export default useChangeLanguage;
