import { navigate } from 'gatsby';
import i18n from '../../../../libs/i18n';

const useSwitchLanguage = (): [() => void] => {
  const newLocale = i18n.language === 'fr' ? 'en' : 'fr';
  const newSlug = newLocale === 'fr' ? '/' : '/en/';

  const switchLanguage = () =>
    i18n.changeLanguage(newLocale).then(() => navigate(newSlug));
  return [switchLanguage];
};

export default useSwitchLanguage;
