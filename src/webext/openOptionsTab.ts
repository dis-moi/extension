import { CreateProperties } from './types';
import { buildQueryString, GetParams } from '../api/call';
import { path } from '../app/routes';

export const getOptionsUrl = (pathname?: string, params: GetParams = {}) =>
  `${process.env.PROFILES_ORIGIN || ''}${pathname ||
    path.fr.CONTRIBUTORS}${buildQueryString(params)}`;

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
