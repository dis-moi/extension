import { i18n } from 'i18next';

export const getPathPrefix = (i18n: i18n): string => `/${i18n.language}`;
