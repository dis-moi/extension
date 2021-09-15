import { navigate } from 'gatsby';
import i18n, { SupportedLanguage } from '../../../../libs/i18n';
import { useEffect } from 'react';

const useSwitchLanguage = (
  locale: SupportedLanguage,
  slug: string
): [() => void] => {
  const newLocale = locale === 'fr' ? 'en' : 'fr';
  i18n.changeLanguage(newLocale);
  const newSlug =
    slug === '/'
      ? 'en'
      : slug === '/en/'
      ? '/'
      : '/' + slug.replace(locale, newLocale);

  useEffect(() => {
    const currentPageLocal = slug.split('/')[0];

    console.log(newLocale, currentPageLocal);
    newLocale !== currentPageLocal && navigate(newSlug);
  }, [newLocale]);

  const switchLanguage = () => navigate(newSlug);
  return [switchLanguage];
};

export default useSwitchLanguage;
