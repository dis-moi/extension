import React from 'react';
import { NavLink, NotificationFooterContainer} from '../../../../components/atoms';
import AccountIcon from './AccountIcon';
import BubbleIcon from './BubbleIcon';
import HelpIcon from './HelpIcon';

const NotificationFooter = () => (
  <NotificationFooterContainer>
    <NavLink to="/notices">
      <BubbleIcon />
    </NavLink>
    <NavLink
      as="a"
      href="https://choisir.lmem.net/questions-frequentes-aide/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <HelpIcon />
    </NavLink>
    <NavLink to="/about">
      <AccountIcon />
    </NavLink>
  </NotificationFooterContainer>
);

export default NotificationFooter;
