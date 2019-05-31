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
    <NavLink
      to=""
      as="a"
      href="https://choisir.lmem.net/questions-frequentes-aide/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <HelpIcon />
    </NavLink>
    <NavLink to="/account/about">
      <AccountIcon />
    </NavLink>
  </FooterContainer>
);

export default NotificationFooter;
