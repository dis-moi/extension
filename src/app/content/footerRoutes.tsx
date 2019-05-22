import React, { ReactElement } from 'react';
import { LocationDescriptor } from 'history';
import BubbleIcon from '../../components/organisms/Notification/NotificationFooter/BubbleIcon';
import CheckListIcon from '../../components/organisms/Notification/NotificationFooter/CheckListIcon';
import HelpIcon from '../../components/organisms/Notification/NotificationFooter/HelpIcon';
import AccountIcon from '../../components/organisms/Notification/NotificationFooter/AccountIcon';

export interface FooterRoute {
  location: LocationDescriptor;
  element: ReactElement;
}

export const footerRoutes: FooterRoute[] = [
  {
    location: '/notices',
    element: <BubbleIcon />
  },
  {
    location: '/subscriptions',
    element: <CheckListIcon />
  },
  {
    location: '/help',
    element: <HelpIcon />
  },
  {
    location: '/account',
    element: <AccountIcon />
  }
];
