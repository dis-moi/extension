import React from 'react';
import styled from 'styled-components';
import LogoDismoi from 'components/atoms/LogoDismoi';
import LogoWrapper from './LogoWrapper';
import { ExternalLink } from 'components/atoms';
import { WEBSITE_DOMAIN } from 'app/lmem';

const HeaderNav = styled.nav`
  position: absolute;
  top: 0;
  right: 10px;
`;

const HeaderNavItem = styled(ExternalLink)`
  font-size: 12px;
  color: ${props => props.theme.primaryColor};

  & + & {
    margin-left: 32px;
  }
`;

const Header = () => (
  <LogoWrapper>
    <LogoDismoi />

    <HeaderNav>
      <HeaderNavItem href={`https://${WEBSITE_DOMAIN}/aide/`}>
        Aide
      </HeaderNavItem>
      <HeaderNavItem href={`https://${WEBSITE_DOMAIN}/devenir-contributeur/`}>
        Devenir contributeur
      </HeaderNavItem>
    </HeaderNav>
  </LogoWrapper>
);

export default Header;
