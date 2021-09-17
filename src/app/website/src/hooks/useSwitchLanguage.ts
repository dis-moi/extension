import { navigate } from 'gatsby';
import i18n, { SupportedLanguage } from '../../../../libs/i18n';

const useSwitchLanguage = (locale: SupportedLanguage): [() => void] => {
  const newLocale = locale === 'fr' ? 'en' : 'fr';
  const newSlug = newLocale === 'fr' ? '/' : '/en';

  const switchLanguage = () =>
    i18n.changeLanguage(newLocale).then(() => navigate(newSlug));
  return [switchLanguage];
};

export default useSwitchLanguage;
