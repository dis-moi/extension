import i18n from 'i18next';
import { buildQueryString, GetParams } from 'libs/api/call';
import { CreateProperties } from './types';

export const getOptionsUrl = (pathname?: string, params: GetParams = {}) => {
  return `${process.env.PROFILES_ORIGIN || ''}${pathname ||
    i18n.t('path.profiles.contributors')}${buildQueryString(params)}`;
};

const createOptionsTabsDescription = (
  pathname?: string,
  params?: GetParams
): CreateProperties => ({
  url: getOptionsUrl(pathname, params),
  active: true
});

const openOptions = (pathname?: string, params?: GetParams) =>
  browser.tabs.create(createOptionsTabsDescription(pathname, params));

export default openOptions;
