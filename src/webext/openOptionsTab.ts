import { CreateProperties } from './types';

export const getOptionsUrl = (pathname?: string) =>
  `${process.env.PROFILES_ORIGIN}${pathname || '/informateurs'}`;

const createOptionsTabsDescription = (pathname?: string): CreateProperties => ({
  url: getOptionsUrl(pathname),
  active: true
});

const openOptions = (pathname?: string) =>
  browser.tabs.create(createOptionsTabsDescription(pathname));

export default openOptions;
