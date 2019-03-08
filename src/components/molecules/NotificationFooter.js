import React from 'react';
import { NavLink, NotificationFooterContainer } from '../atoms';
import {
  Account, Bubble, CheckList, Help 
} from '../atoms/icons/nav';

const NotificationFooter = () => (
  <NotificationFooterContainer>
    <NavLink to="/notices">
      <Bubble />
    </NavLink>
    <NavLink to="/subscriptions">
      <CheckList />
    </NavLink>
    <NavLink to="/help">
      <Help />
    </NavLink>
    <NavLink to="/account">
      <Account />
    </NavLink>
  </NotificationFooterContainer>
);

export default NotificationFooter;
