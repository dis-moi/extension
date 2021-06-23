import React from 'react';
import styled from 'styled-components';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';

const FooterWrapper = styled.footer`
  display: flex;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${props => props.theme.website.textSizeDesktop};
  background-color: #1d1d1d;
  padding: 20px 15px 20px 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    padding-right: 20px;
    padding-left: 20px;
  }

  &,
  a {
    color: #fff;
  }

  a {
    text-decoration: none;
  }
`;

const NavFooter = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;

  a:not(:first-child) {
    margin-top: 1rem;
  }

  @media (min-width: ${props => props.theme.tabletWidth}) {
    flex-direction: row;
    align-items: flex-start;

    a:not(:first-child) {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

const Legals = styled.p`
  font-size: 12px;
  text-align: center;

  @media (min-width: ${props => props.theme.tabletWidth}) {
    text-align: right;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        Logo
        <nav>
          <a href="#_">Mastodon</a>
          <a href="#_">Github</a>
          <a href="#_">Linkedin</a>
          <a href="#_">Twitter</a>
          <a href="#_">Facebook</a>
        </nav>
      </div>

      <div>
        <NavFooter>
          <NavDesktopItem href="#_">Contact</NavDesktopItem>
          <NavDesktopItem href="#_">À propos</NavDesktopItem>
          <NavDesktopItem href="#_">Aide/FAQ</NavDesktopItem>
          <NavDesktopItem href="#_">Mentions légales</NavDesktopItem>
          <NavDesktopItem href="#_">CGU</NavDesktopItem>
          <NavDesktopItem href="#_">Espace presse</NavDesktopItem>
        </NavFooter>
      </div>

      <div>
        <a href="#_">fr/en</a>

        <Legals>
          Droits réservés textes et images <br />
          DisMoi © 2021
        </Legals>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
