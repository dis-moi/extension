import React from 'react';
import styled from 'styled-components';
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
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

type Platform = 'macos' | 'ios' | 'windows' | 'android' | 'linux' | string;
type Browser = 'firefox' | 'chrome' | 'safari' | 'edge' | 'brave' | string;

export interface CATButtonProps {
  platform?: Platform;
  browser?: Browser;
  text?: string;
  details?: string | React.ReactElement;
}

const logoSvg = (logo: Platform | Browser) => {
  if (logo === 'android') return <LogoAndroid />;
  if (logo === 'ios') return <LogoIOs />;
  if (logo === 'firefox') return <LogoFirefox />;
  if (logo === 'chrome') return <LogoChrome />;
};

const CATButton = ({ platform, browser, text, details }: CATButtonProps) => {
  if (!platform) {
    // If platform is not forced :
    // Platform detection
    const navPlatform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let platform = null;
    if (macosPlatforms.indexOf(navPlatform) !== -1) {
      platform = 'macos';
    } else if (iosPlatforms.indexOf(navPlatform) !== -1) {
      platform = 'ios';
    } else if (windowsPlatforms.indexOf(navPlatform) !== -1) {
      platform = 'windows';
    } else if (/Android/.test(navPlatform)) {
      platform = 'android';
    } else if (!platform && /Linux/.test(navPlatform)) {
      platform = 'linux';
    }
  }
  const isMobile = platform && /ios|android/i.test(platform);

  if (!browser) {
    // If browser is not forced :
    // Browser detection
    browser = (function() {
      const ua = navigator.userAgent;
      let tem;
      let M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null)
          return tem
            .slice(1)
            .join(' ')
            .replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      // return M.join(' ');
      return M[0].toLowerCase(); // without version
    })();
  }
  const browserIsValid = browser && /firefox|chrome/i.test(browser);

  const logo = isMobile ? platform : browserIsValid ? browser : null;

  if (!text) {
    // If text is not forced :
    text = isMobile
      ? 'Installer l’app'
      : browserIsValid && browser
      ? 'Ajouter à ' + browser.charAt(0).toUpperCase() + browser.slice(1)
      : 'Installer l’extension';
  }

  if (!details) {
    // If details is not forced :
    details = (
      <>
        Gratuit, sans publicité, <br />
        respecte votre vie privée
      </>
    );
  }

  return (
    <Button className={isMobile ? 'forMobile' : ''}>
      {logo && <Logo>{logoSvg(logo)}</Logo>}
      <Text>
        {text}
        <Detail>{details}</Detail>
      </Text>
    </Button>
  );
};

export default CATButton;
