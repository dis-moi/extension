import React from 'react';
import { NavLink, NotificationFooterContainer} from '../../../components/atoms';
import { Account, Bubble, Help } from '../../../components/atoms/icons/nav';

const NotificationFooter = () => (
  <NotificationFooterContainer>
    <NavLink to="/notices">
      <Bubble />
    </NavLink>
    <NavLink
      as="a"
      href="https://choisir.lmem.net/questions-frequentes-aide/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Help />
    </NavLink>
    <NavLink to="/about">
      <Account />
    </NavLink>
  </NotificationFooterContainer>
);

export default NotificationFooter;
