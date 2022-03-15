import { i18n } from 'i18next';
import { getFacet } from './getFacet';

export const getPathPrefix = (i18n: i18n): string =>
  getFacet() === 'lmel' ? '' : `/${i18n.language}`;
