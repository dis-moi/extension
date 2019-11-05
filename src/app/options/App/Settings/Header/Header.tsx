import React from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/LogoBeta';
import LogoWrapper from './LogoWrapper';
import { ExternalLink } from 'components/atoms';

const HeaderNav = styled.nav``;

const HeaderNavItem = styled(ExternalLink)`
  font-size: 16px;
  color: ${props => props.theme.primaryColor} & + & {
    margin-left: 16px;
  }
`;

const Header = () => (
  <LogoWrapper>
    <Logo />

    <HeaderNav>
      <HeaderNavItem href="https://www.bulles.fr/devenir-contributeur/">
        Devenir contributeur
      </HeaderNavItem>
      <HeaderNavItem href="https://www.bulles.fr/aide/">Aide</HeaderNavItem>
    </HeaderNav>
  </LogoWrapper>
);

export default Header;
