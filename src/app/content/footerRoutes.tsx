import { LocationDescriptor } from 'history';

export interface FooterRoute {
  location: LocationDescriptor;
  element: string;
}

export const footerRoutes: FooterRoute[] = [
  {
    location: '/notices',
    element: 'Bulles'
  },
  {
    location: '/subscriptions',
    element: 'Abonnements'
  },
  {
    location: '/help',
    element: 'Aide'
  },
  {
    location: '/account',
    element: 'Mon compte'
  }
];
