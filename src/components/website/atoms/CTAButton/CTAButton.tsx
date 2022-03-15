import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useDefineClientSetup from 'libs/hooks/useDefineClientSetup';
import { installExtension } from 'libs/webext/extensionDetectionAndInstall';
import { Browser } from '../../../../utils/website/getBrowser';
import { Platform } from '../../../../utils/website/getPlatform';
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

const logoSvg = (logo: Platform | Browser) => {
  if (logo === 'android') return <LogoAndroid />;
  if (logo === 'ios') return <LogoIOs />;
  if (logo === 'firefox') return <LogoFirefox />;
  if (logo === 'chrome') return <LogoChrome />;
  return null;
};

export interface CATButtonProps {
  platform?: Platform;
  browser?: Browser;
  text?: string;
  details?: string | React.ReactElement;
  className?: string;
}

const CTAButton = ({
  platform,
  browser,
  text,
  details,
  className
}: CATButtonProps) => {
  const { t } = useTranslation('website');

  const {
    currentBrowser,
    isBrowserValid,
    currentPlatform,
    isMobile
  } = useDefineClientSetup(browser, platform);

  const logo = isMobile
    ? currentPlatform
    : isBrowserValid
    ? currentBrowser
    : null;

  // If text is not forced :
  if (!text) {
    text = isMobile
      ? t('home.cta.installApp')
      : isBrowserValid && currentBrowser
      ? t('home.cta.addTo') +
        ' ' +
        currentBrowser.charAt(0).toUpperCase() +
        currentBrowser.slice(1)
      : t('home.cta.addToBrowser');
  }

  // If details is not forced :
  if (!details) {
    details = (
      <>
        {t('home.cta.free')}, {t('home.cta.noAds')}, <br />
        {t('home.cta.privacy')}
      </>
    );
  }

  return (
    <Button
      className={(className || '') + (isMobile ? ' forMobile' : '')}
      onClick={installExtension}
    >
      {logo && <Logo>{logoSvg(logo)}</Logo>}
      <Text>
        {text}
        <Detail>{details}</Detail>
      </Text>
    </Button>
  );
};

export default CTAButton;
