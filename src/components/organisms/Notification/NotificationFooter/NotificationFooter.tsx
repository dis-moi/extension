import React from 'react';
import FooterContainer from './FooterContainer';
import NavLink from './NavLink';
import {
  FooterRoute,
  footerRoutes
} from '../../../../app/content/footerRoutes';
interface NotificationFooterProps {
  children?: FooterRoute[];
}

const NotificationFooter = ({ children }: NotificationFooterProps) => {
  return (
    <FooterContainer>
      {children &&
        children.map(route => (
          <NavLink key={route.location as string} to={route.location}>
            {route.element}
          </NavLink>
        ))}
    </FooterContainer>
  );
};

NotificationFooter.defaultProps = {
  children: footerRoutes
};

export default NotificationFooter;
