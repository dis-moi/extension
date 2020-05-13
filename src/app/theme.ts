import { BadgeTheme } from './lmem/badge';

export interface ButtonTheme {
  default: string;
  hover: string;
  disabled: string;
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
  marginM: string;
  marginL: string;

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
  marginM: '30px',
  marginL: '40px',

  // Button colors
  Button: {
    default: '#0C52B4',
    hover: '#05224B',
    disabled: '#BAB8B8',
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
  }
};

export default theme;
