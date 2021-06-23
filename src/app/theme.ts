import { BadgeTheme } from './lmem/badge';

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
    animationFastDuration: string;
    boxShadow: string;
  };
}

export const theme: Theme = {
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

  website: {
    radius: '10px',
    radiusSmall: '6px',
    primaryColor: '#0C52B4',
    primaryColorDarker: '#1b386c',
    secondaryColor: '#17baae',
    secondaryColorDarker: '#148D84',
    activeColor: '#ff981d',
    activeColorDarker: '#ce740f',
    greyColor: '#DDDDDD',
    greyColorLighter: '#F5F5F5',
    greyColorDarker: '#6D747E',
    fontFamily: "'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    textSizeMobile: '16px',
    textSizeTablet: '17px',
    textSizeDesktop: '18px',
    animationSlowDuration: '0.5s',
    animationFastDuration: '0.1s',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px;'
  }
};

export default theme;
