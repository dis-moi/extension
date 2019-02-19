import React from 'react';
import FooterContainer from './FooterContainer';
import NavLink from './NavLink';
import AccountIcon from './AccountIcon';
import BubbleIcon from './BubbleIcon';
import CheckListIcon from './CheckListIcon';
import HelpIcon from './HelpIcon';

const NotificationFooter = () => (
  <FooterContainer>
    <NavLink to="/notices">
      <BubbleIcon />
    </NavLink>
    <NavLink to="/subscriptions">
      <CheckListIcon />
    </NavLink>
    <NavLink to="/help">
      <HelpIcon />
    </NavLink>
    <NavLink to="/account">
      <AccountIcon />
    </NavLink>
  </FooterContainer>
);

export default NotificationFooter;
