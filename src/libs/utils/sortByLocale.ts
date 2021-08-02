import * as R from 'ramda';
import { SupportedLanguage } from '../i18n';
import { Contributor } from '../domain/contributor';
import { Notice } from '../domain/notice';

function sortByLocale<Items extends Notice | Contributor>(
  items: Items[],
  locale: SupportedLanguage
): Items[] {
  return R.sort(item => (item.locale === locale ? -1 : 1), items);
}

export default sortByLocale;
