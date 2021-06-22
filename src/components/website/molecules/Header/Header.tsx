import React, { useEffect, useState } from 'react';
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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  const isScrolled = scrolled || offset > 100;

  return (
    <header className={className + (isScrolled ? ' scrolled' : '')}>
      <a className="homeLink" href={'/'}>
        <LogoDisMoi />
      </a>
      <NavDesktop>
        <NavDesktopItem href={'#'}>Tous les profils</NavDesktopItem>
        <NavDesktopItem href={'#'}>Contribuer</NavDesktopItem>
        {isScrolled && (
          <Button
            text={'Ajouter DisMoi'}
            details={'Gratuit'}
            icon={'download'}
            color={'green'}
            handleClick={() =>
              // eslint-disable-next-line no-console
              console.log('%cGO TO APP STORE!', 'font-weight:bold;color:blue;')
            }
          />
        )}
        <NavDesktopItem href={'#'}>Aide</NavDesktopItem>
        <NavDesktopItem href={'#'}>fr | en</NavDesktopItem>
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

    a:last-of-type {
      transform-origin: center;
      transform: scale(0.8);
    }
  }
  &:not(.scrolled) {
    a.homeLink {
      svg path {
        fill: white;
      }
      &:hover svg path {
        fill: ${props => props.theme.website.secondaryColor};
      }
      &:active svg path {
        fill: ${props => props.theme.website.activeColor};
      }
    }
  }
  &.scrolled {
    background: white;
    color: ${props => props.theme.website.primaryColor};
    padding-top: 6px;
    padding-bottom: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    a.homeLink {
      transform-origin: left center;
      transform: scale(0.85);
    }
    nav {
      transform-origin: right center;
      transform: scale(0.85);

      a:last-of-type {
        color: ${props => props.theme.website.greyColorDarker};
      }
    }
  }
`;

export default Header;
