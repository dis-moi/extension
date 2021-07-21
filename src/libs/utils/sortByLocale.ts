import { SupportedLanguage } from '../i18n';
import { Contributor } from '../domain/contributor';
import { Notice } from '../domain/notice';

function sortByLocale<Items extends Notice | Contributor>(
  items: Items[],
  locale: SupportedLanguage
): Items[] {
  const localItems = items.filter(i => i.locale === locale);
  const extItems = items.filter(i => i.locale !== locale);
  return [...localItems, ...extItems];
}

export default sortByLocale;
