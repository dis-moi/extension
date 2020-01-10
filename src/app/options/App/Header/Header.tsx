import React from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo';
import LogoWrapper from './LogoWrapper';
import { ExternalLink } from 'components/atoms';

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
    <Logo />

    <HeaderNav>
      <HeaderNavItem href="https://www.bulles.fr/aide/">Aide</HeaderNavItem>
      <HeaderNavItem href="https://www.bulles.fr/devenir-contributeur/">
        Devenir contributeur
      </HeaderNavItem>
    </HeaderNav>
  </LogoWrapper>
);

export default Header;
