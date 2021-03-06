import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FooterRoute,
  footerRoutes
} from '../../../../app/content/footerRoutes';
import FooterContainer from './FooterContainer';
import NavLink from './NavLink';

interface NotificationFooterProps {
  children?: FooterRoute[];
}

const NotificationFooter = ({ children }: NotificationFooterProps) => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      {children &&
        children.map(route => (
          <NavLink key={route.location as string} to={route.location}>
            {t(route.i18nKey)}
          </NavLink>
        ))}
    </FooterContainer>
  );
};

NotificationFooter.defaultProps = {
  children: footerRoutes
};

export default NotificationFooter;
