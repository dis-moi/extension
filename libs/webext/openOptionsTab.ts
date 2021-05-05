import { CreateProperties } from './types';
import {
  buildQueryString,
  GetParams
} from '../../apps/background/src/api/call';
import i18n from 'i18next';

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
