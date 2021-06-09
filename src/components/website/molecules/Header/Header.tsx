import React from 'react';
import styled from 'styled-components';
import NavDesktop from '../../atoms/NavDesktop/NavDesktop';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';
import Button from '../../atoms/Button/Button';
import LogoDisMoi from '../../atoms/LogoDisMoi/LogoDisMoi';

export interface HeaderProps {
  className?: string;
  scrolled?: boolean;
}

const Header = styled(({ className, scrolled }: HeaderProps) => {
  return (
    <header className={className + (scrolled ? ' scrolled' : '')}>
      <a className="homeLink" href={'/'}>
        <LogoDisMoi />
      </a>
      <NavDesktop>
        <NavDesktopItem href={'#'}>Tous les contributeurs</NavDesktopItem>
        <NavDesktopItem href={'#'}>Poster une info</NavDesktopItem>
        {scrolled && (
          <Button
            text={'Ajouter DisMoi'}
            details={'Gratuit'}
            icon={'download'}
            color={'green'}
          />
        )}
        <NavDesktopItem href={'#'}>Aide</NavDesktopItem>
        <NavDesktopItem href={'#'}>fr/en</NavDesktopItem>
      </NavDesktop>
    </header>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  padding: 10px 15px 10px 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    padding-right: 20px;
    padding-left: 20px;
  }
  color: white;
  a.homeLink {
    display: block;
    transform-origin: left center;
    transition: transform ${props => props.theme.website.animationFastDuration};
    height: 30px;
    @media (min-width: ${props => props.theme.tabletWidth}) {
      height: 32px;
    }
    @media (min-width: ${props => props.theme.desktopWidth}) {
      height: 34px;
    }
    svg {
      height: inherit;
      path {
        transition: fill ${props => props.theme.website.animationFastDuration};
      }
    }
  }
  nav {
    transform-origin: right center;
    transition: transform ${props => props.theme.website.animationFastDuration};
  }
  &:not(.scrolled) {
    a.homeLink {
      svg path {
        fill: white;
      }
      &:hover svg path {
        fill: ${props => props.theme.website.primaryColor};
      }
      &:active svg path {
        fill: ${props => props.theme.website.activeColor};
      }
    }
    a {
      &:hover {
        color: ${props => props.theme.website.primaryColor};
      }
      &:active {
        color: ${props => props.theme.website.activeColor};
      }
    }
  }
  &.scrolled {
    background: white;
    color: ${props => props.theme.website.primaryColor};
    padding-top: 6px;
    padding-bottom: 6px;
    a.homeLink {
      transform: scale(0.85);
    }
    nav {
      transform: scale(0.85);
    }
  }
`;

export default Header;
