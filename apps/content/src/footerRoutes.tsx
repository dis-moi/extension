import { LocationDescriptor } from 'history';

export interface FooterRoute {
  location: LocationDescriptor;
  i18nKey: string;
}

export const footerRoutes: FooterRoute[] = [
  {
    location: '/notices',
    i18nKey: 'menu.contributions'
  },
  {
    location: '/subscriptions',
    i18nKey: 'menu.subscriptions'
  },
  {
    location: '/help',
    i18nKey: 'menu.help'
  },
  {
    location: '/account',
    i18nKey: 'menu.my_account'
  }
];
