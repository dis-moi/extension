import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavDesktop from '../../atoms/NavDesktop/NavDesktop';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';
import Button from '../../atoms/Button/Button';
import LogoDisMoi from '../../atoms/LogoDisMoi/LogoDisMoi';
import ToggleMenu from '../../atoms/NavMobileButton/ToggleMenu';
import Modal from '../../atoms/Modal/Modal';
import NavMobile from '../../atoms/NavMobile/NavMobile';
import NavMobileItem from '../../atoms/NavMobileItem/NavMobileItem';

const MobileButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 15px;
    span:nth-child(1) {
      padding-right: 0;
      @media (min-width: 350px) {
        padding-right: 8px;
      }
    }
    span:nth-child(2) {
      display: none;
      @media (min-width: 350px) {
        display: block;
      }
      span {
        display: none;
        @media (min-width: 450px) {
          display: inline-block;
        }
      }
    }
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: none;
  }
`;

const HeaderCTAButton = () => (
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
);

export interface HeaderProps {
  className?: string;
  scrolled?: boolean;
}

const Header = styled(({ className, scrolled }: HeaderProps) => {
  const [offset, setOffset] = useState(0);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  const isScrolled = scrolled || offset > 0;

  return (
    <>
      <header className={className + (isScrolled ? ' scrolled' : '')}>
        <a className="homeLink" href={'/'}>
          <LogoDisMoi />
        </a>
        <NavDesktop>
          <NavDesktopItem href={'#'}>Tous les profils</NavDesktopItem>
          <NavDesktopItem href={'#'}>Contribuer</NavDesktopItem>
          <NavDesktopItem href={'#'}>Questions fréquentes</NavDesktopItem>
          {isScrolled && <HeaderCTAButton />}
          <NavDesktopItem href={'#'}>fr | en</NavDesktopItem>
        </NavDesktop>
        <MobileButtonsWrapper>
          {isScrolled && <HeaderCTAButton />}
          <ToggleMenu handleClick={() => setModalOpen(true)} />
        </MobileButtonsWrapper>
      </header>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <NavMobile>
          <NavMobileItem href={'#'}>Tous les profils</NavMobileItem>
          <NavMobileItem href={'#'}>Contribuer</NavMobileItem>
          <NavMobileItem href={'#'}>Questions fréquentes</NavMobileItem>
          <HeaderCTAButton />
          <NavMobileItem href={'#'}>
            <b>fr</b> | en
          </NavMobileItem>
        </NavMobile>
      </Modal>
    </>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  ${NavDesktop} {
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
    box-shadow: ${props => props.theme.website.boxShadow};
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
    ${ToggleMenu} {
      path {
        fill ${props => props.theme.website.secondaryColor};
        &:hover {
          fill ${props => props.theme.website.primaryColor};
        }
        &:active {
          fill ${props => props.theme.website.activeColor};
        }
      }
    }
  }
`;

export default Header;
