import { navigate } from 'gatsby';
import i18n, { SupportedLanguage } from '../../../../libs/i18n';

const switchLanguage = (locale: SupportedLanguage, slug: string) => {
  const newLocale = locale === 'fr' ? 'en' : 'fr';
  i18n.changeLanguage(newLocale);
  const newSlug =
    slug === '/'
      ? 'en'
      : slug === '/en/'
      ? '/'
      : '/' + slug.replace(locale, newLocale);
  navigate(newSlug);
};

export default switchLanguage;
