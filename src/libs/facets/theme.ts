import * as R from 'ramda';
import { BadgeTheme } from 'libs/domain/badge';

export interface ButtonTheme {
  default: string;
  hover: string;
  disabled: string;
  action: string;
  radius: string;
}

export interface Theme {
  main: string;

  // colors
  primaryColor: string;
  activeColor: string;
  grey: string;

  otherText: string;
  secondaryColor: string;
  deletedText: string;
  noticeBg: string;
  navInactive: string;
  navActive: string;
  link: string;
  highlightedLink: string;
  accountListBg: string;
  pagesBg: string;

  // color list:
  bottomBar: string;
  topBarNavInactiveDeleteBg: string;
  text: string;
  error: string;
  formError: string;
  button: string;
  contributorGrey: string;
  contributorIntro: string;

  titleColor: string;
  textColor: string;

  badge: BadgeTheme;
  Button: ButtonTheme;

  // sizes:
  radius: string;
  fontSizeDefault: string;
  marginS: string;
  marginM: string;
  marginL: string;
  tabletWidth: string;
  desktopWidth: string;

  // iframe
  iframe: {
    style: {
      'max-width': string;
      'min-width': string;
      'min-height': string;
      'max-height': string;
      position: string;
      top: string;
      right: string;
      'z-index': number; // Max z-index value (signed 32bits integer)
      border: string;
      transition: string;
      width: string;
      height: string;
      left: string;
      display: string;
    };
  };

  // breakpoint
  breakpoint: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  website: {
    radius: string;
    radiusSmall: string;
    primaryColor: string;
    primaryColorDarker: string;
    secondaryColor: string;
    secondaryColorDarker: string;
    activeColor: string;
    activeColorDarker: string;
    greyColor: string;
    greyColorLighter: string;
    greyColorDarker: string;
    fontFamily: string;
    textSizeMobile: string;
    textSizeTablet: string;
    textSizeDesktop: string;
    animationSlowDuration: string;
    animationMediumDuration: string;
    animationFastDuration: string;
    boxShadow: string;

    // FIXME find me better names @Antoine
    contributorAvatarLinkAfterBackgroundColor: string;
    modalBackgroundColor: string;
    modalBackgroundColorBis: string;
    secondaryColorDarkerBackground: string;
    videoImageBackgroundColor: string;
    videoImageBackgroundHoverColor: string;
    videoImageBackgroundActiveColor: string;
    contributorSectionBackgroundColor: string;
    coverSectionBackgroundColor: string;
    coverSectionBackgroundColorBis: string;
  };
}

export const dismoiTheme: Theme = {
  main: 'purple',
  // colors
  primaryColor: '#404348',
  activeColor: '#0C52B4',
  grey: '#808080',

  otherText: '#787993',
  secondaryColor: '#5F656C',
  deletedText: '#484046',
  noticeBg: '#EFEDED',
  navInactive: '#a6b1c0',
  navActive: '#4378A5',
  link: '#1974C3',
  highlightedLink: '#F21360',
  accountListBg: '#fff',
  pagesBg: '#E9EBEF',

  // color list:
  bottomBar: '#DDDDDD',
  topBarNavInactiveDeleteBg: '#A6B1C0',
  text: '#404348',
  error: '#F01953',
  formError: '#DB0D0D',
  button: '#0C52B4',
  contributorGrey: '#F5F5F5',
  contributorIntro: '#100E0E',

  titleColor: '#000',
  textColor: '#22252B',

  // badge background colors
  badge: {
    backgroundColor: {
      hasAllNoticesRead: '#9DA1A7',
      hasUnreadNotices: '#DB0D0D'
    }
  },

  // sizes:
  radius: '8px',
  fontSizeDefault: '16px',
  marginS: '20px',
  marginM: '30px',
  marginL: '40px',
  tabletWidth: '768px',
  desktopWidth: '992px',

  // Button colors
  Button: {
    default: '#0C52B4',
    hover: '#05224B',
    disabled: '#BAB8B8',
    action: '#0CB46D',
    radius: '5px'
  },

  // iframe
  iframe: {
    style: {
      'max-width': 'initial',
      'min-width': 'initial',
      'min-height': 'initial',
      'max-height': 'initial',
      position: 'fixed',
      top: '0',
      right: '10px',
      'z-index': 2147483647, // Max z-index value (signed 32bits integer)
      border: 'none',
      transition: 'height .1s',
      width: '390px',
      height: '423px',
      left: 'auto',
      display: 'block'
    }
  },

  // breakpoint
  breakpoint: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  },

  website: {
    radius: '10px',
    radiusSmall: '6px',
    primaryColor: '#0C52B4',
    primaryColorDarker: '#1b386c',
    secondaryColor: '#17baae',
    secondaryColorDarker: '#0f6c6c',
    activeColor: '#ff981d',
    activeColorDarker: '#ce740f',
    greyColor: '#DDDDDD',
    greyColorLighter: '#F5F5F5',
    greyColorDarker: '#666b79',
    fontFamily: "'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    textSizeMobile: '16px',
    textSizeTablet: '17px',
    textSizeDesktop: '18px',
    animationSlowDuration: '0.5s',
    animationMediumDuration: '0.25s',
    animationFastDuration: '0.1s',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px;',

    contributorAvatarLinkAfterBackgroundColor: 'rgba(23, 186, 174, 0.8)',
    modalBackgroundColor: 'rgba(40, 85, 162, 0.95)',
    modalBackgroundColorBis: `linear-gradient(
      180deg,
      rgba(40, 85, 162, 1) 0%,
      rgba(40, 85, 162, 0.95) 100%
    )`,
    secondaryColorDarkerBackground: 'rgba(23, 186, 174, 0.1)',
    videoImageBackgroundColor: 'rgba(40, 85, 162, 0.95)',
    videoImageBackgroundHoverColor: 'rgb(23, 186, 174, 0.95)',
    videoImageBackgroundActiveColor: 'rgb(255, 152, 29, 0.95)',
    contributorSectionBackgroundColor: 'rgba(23, 186, 174, 0.1)',
    coverSectionBackgroundColor: 'rgb(12, 82, 180)',
    coverSectionBackgroundColorBis: `linear-gradient(
      60deg,
      rgba(12, 82, 180, 1) 0%,
      rgba(23, 186, 174, 1) 100%
    )`
  }
};

export const lmelTheme = R.mergeDeepRight(dismoiTheme, {
  activeColor: '#283a7c',
  // Button colors
  Button: {
    default: '#283a7c',
    hover: '#172344',
    disabled: '#BAB8B8',
    action: '#ec9119',
    radius: '5px'
  },
  /* TODO : @Jalil to clean the best you can ;-D */
  website: {
    radius: '10px',
    radiusSmall: '6px',
    primaryColor: '#283a7c',
    primaryColorDarker: '#172344',
    secondaryColor: '#fab51a',
    secondaryColorDarker: '#ec9119',
    activeColor: '#e42225',
    activeColorDarker: '#93181e',
    greyColor: '#DDDDDD',
    greyColorLighter: '#F5F5F5',
    greyColorDarker: '#666b79',
    fontFamily: "'Barlow', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    textSizeMobile: '16px',
    textSizeTablet: '17px',
    textSizeDesktop: '18px',
    animationSlowDuration: '0.5s',
    animationMediumDuration: '0.25s',
    animationFastDuration: '0.1s',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px;'
  }
} as Partial<Theme>);
