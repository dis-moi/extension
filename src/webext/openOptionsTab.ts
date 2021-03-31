import { CreateProperties } from './types';
import { buildQueryString, GetParams } from '../api/call';
import { path } from '../routes';
import useChangeLanguage from '../app/hooks/useChangeLanguage';

export const getOptionsUrl = (pathname?: string, params: GetParams = {}) => {
  const lang = useChangeLanguage();
  return `${process.env.PROFILES_ORIGIN || ''}${pathname ||
    path[lang].CONTRIBUTORS}${buildQueryString(params)}`;
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
