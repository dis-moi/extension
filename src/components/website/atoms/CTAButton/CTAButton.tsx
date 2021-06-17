import React from 'react';
import styled from 'styled-components';
import { Browser, getBrowser } from '../../../../utils/website/getBrowser';
import { getPlatform, Platform } from '../../../../utils/website/getPlatform';
import { getIsMobile } from '../../../../utils/website/getIsMobile';
import { getIsBrowserValid } from '../../../../utils/website/getIsBrowserValid';
import LogoAndroid from './logos/LogoAndroid';
import LogoIOs from './logos/LogoIOs';
import LogoFirefox from './logos/LogoFirefox';
import LogoChrome from './logos/LogoChrome';

const Button = styled.button`
  box-sizing: border-box;
  padding: 11px 15px 12px 15px;
  background-color: white;
  border: none;
  border-radius: ${props => props.theme.website.radius};
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.website.primaryColor};
  transition: color 0.1s, background-color 0.1s;
  &:hover {
    background-color: ${props => props.theme.website.primaryColor};
    color: white;
    cursor: pointer;
  }
  &:active {
    background-color: ${props => props.theme.website.activeColor};
  }
`;

const Logo = styled.span`
  display: block;
  padding-right: 10px;
  svg {
    height: 65px;
    width: 65px;
  }
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: ${props => props.theme.website.fontFamily};
  font-size: 24px;
  font-weight: bold;
`;

const Detail = styled.span`
  display: block;
  padding-top: 3px;
  text-align: left;
  font-size: 12px;
  line-height: 1.3;
  text-transform: uppercase;
  font-weight: normal;
`;

export interface CATButtonProps {
  platform?: Platform;
  browser?: Browser;
  text?: string;
  details?: string | React.ReactElement;
  className?: string;
}

const logoSvg = (logo: Platform | Browser) => {
  if (logo === 'android') return <LogoAndroid />;
  if (logo === 'ios') return <LogoIOs />;
  if (logo === 'firefox') return <LogoFirefox />;
  if (logo === 'chrome') return <LogoChrome />;
  return null;
};

const CTAButton = ({
  platform,
  browser,
  text,
  details,
  className
}: CATButtonProps) => {
  const currentPlatform = platform || getPlatform;
  const isMobile = getIsMobile(currentPlatform);
  const currentBrowser = browser || getBrowser;
  const isBrowserValid = getIsBrowserValid(currentBrowser);
  const logo = isMobile
    ? currentPlatform
    : isBrowserValid
    ? currentBrowser
    : null;

  // If text is not forced :
  if (!text) {
    text = isMobile
      ? 'Installer l’app'
      : isBrowserValid && currentBrowser
      ? 'Ajouter à ' +
        currentBrowser.charAt(0).toUpperCase() +
        currentBrowser.slice(1)
      : 'Ajouter à mon navigateur';
  }

  // If details is not forced :
  if (!details) {
    details = (
      <>
        Gratuit, sans publicité, <br />
        respecte votre vie privée
      </>
    );
  }

  return (
    <Button className={(className || '') + (isMobile ? ' forMobile' : '')}>
      {logo && <Logo>{logoSvg(logo)}</Logo>}
      <Text>
        {text}
        <Detail>{details}</Detail>
      </Text>
    </Button>
  );
};

export default CTAButton;
