import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Facet } from 'libs/facets/facet';
import NavDesktop from '../../atoms/NavDesktop/NavDesktop';
import Button from '../../atoms/Button/Button';
import LogoDisMoi from '../../atoms/LogoDisMoi/LogoDisMoi';
import LogoLMEL from '../../atoms/LogoLMEL/LogoLMEL';
import ToggleMenu from '../../atoms/NavMobileButton/ToggleMenu';
import Modal from '../../atoms/Modal/Modal';
import NavMobile from '../../atoms/NavMobile/NavMobile';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';
import ListLinks, { Link } from './ListLinks';
import { useTranslation } from 'react-i18next';

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

export const HeaderCTAButton = () => {
  const { t } = useTranslation('website');
  return (
    <Button
      text={t('header.ctaText')}
      icon={'download'}
      color={'green'}
      handleClick={() =>
        // eslint-disable-next-line no-console
        console.log('%cGO TO APP STORE!', 'font-weight:bold;color:blue;')
      }
    />
  );
};

export type Scrolled = boolean;

export interface HeaderProps {
  className?: string;
  links: Link[];
  switchLanguage: () => void;
  isHome: boolean;
  facet: Facet;
}

const Header = styled(
  ({ className, links, switchLanguage, isHome, facet }: HeaderProps) => {
    const [scrolledClass, setScolledClass] = useState('');
    const [opacity, setOpacity] = useState(0);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    useEffect(() => {
      setOpacity(100);
      const setMoove = () => {
        if (isHome) {
          if (window.pageYOffset === 0) return setScolledClass('');
          return setScolledClass('scrolled');
        } else {
          return setScolledClass('scrolled');
        }
      };
      setMoove();
      window.onscroll = () => {
        setMoove();
      };
    }, [isHome]);

    return (
      <>
        <header className={className + ' ' + scrolledClass} style={{ opacity }}>
          <a className="homeLink" href={'/'}>
            {facet === 'lmel' ? <LogoLMEL /> : <LogoDisMoi />}
          </a>
          <NavDesktop>
            <ListLinks links={links} />
            {!!scrolledClass && <HeaderCTAButton />}
            {facet === 'lmel' ? (
              <> </>
            ) : (
              <NavDesktopItem onClick={switchLanguage}>
                <span title="French">fr</span> | <span title="English">en</span>
              </NavDesktopItem>
            )}
          </NavDesktop>
          <MobileButtonsWrapper>
            {!!scrolledClass && <HeaderCTAButton />}
            <ToggleMenu handleClick={() => setModalOpen(true)} />
          </MobileButtonsWrapper>
        </header>
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <NavMobile>
            <ListLinks links={links} />
            <HeaderCTAButton />
          </NavMobile>
        </Modal>
      </>
    );
  }
)`
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
    ${props =>
      props.facet !== 'lmel'
        ? css`
            a:last-of-type {
              transform-origin: center;
              transform: scale(0.8);
            }
          `
        : undefined}
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
    nav {
      a:hover {
        color: ${props => props.theme.website.activeColor} !important;
      }
      a:active {
        color: white !important;
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
