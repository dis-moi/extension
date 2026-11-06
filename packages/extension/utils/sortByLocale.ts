import { SupportedLanguage } from '@dismoi/i18n';
import { Contributor } from '@dismoi/domain/contributor';
import { Notice } from '@dismoi/domain/notice';

function sortByLocale<Items extends Notice | Contributor>(
  items: Items[],
  locale: SupportedLanguage,
): Items[] {
  const localItems = items.filter((i) => i.locale === locale);
  const extItems = items.filter((i) => i.locale !== locale);
  return [...localItems, ...extItems];
}

export default sortByLocale;
