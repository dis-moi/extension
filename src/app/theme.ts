import { BadgeTheme } from './lmem/badge';

export interface ButtonTheme {
  default: string;
  hover: string;
  disabled: string;
  action: string;
  radius: string;
}

export interface Theme {
  // radius
  radiusS: string;
  radiusM: string;
  radiusL: string;

  // colors
  colorWhite: string;
  colorBlack: string;
  colorPrimary: string;
  colorText: string;
  colorAlert: string;
  colorGrey100: string;
  colorGrey200: string;
  colorGrey300: string;
  colorGrey400: string;
  colorGrey500: string;
  colorGreen100: string;
  colorGreen200: string;
  colorGreen300: string;
  colorOrange100: string;

  // font sizes
  fontSizeXS1: string;
  fontSizeXS2: string;
  fontSizeS1: string;
  fontSizeS2: string;
  fontSizeM1: string;
  fontSizeM2: string;
  fontSizeL1: string;
  fontSizeL2: string;
  fontSizeXL: string;

  // font weights
  fontWeightNormal: string;
  fontWeightBold: string;

  /// ///// OLD /////
  // colors
  primaryColor: string;
  secondaryColor: string;

  // color list:
  badge: BadgeTheme;
  Button: ButtonTheme;

  // screen sizes:
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
}

export const theme: Theme = {
  // radius
  radiusS: '5px',
  radiusM: '8px',
  radiusL: '20px',

  // colors
  colorWhite: '#fff',
  colorBlack: '#000',
  colorPrimary: '#0c52b4',
  colorText: '#22252b',
  colorAlert: '#db0d0d',
  colorGrey100: '#f5f5f5',
  colorGrey200: '#e9ebef',
  colorGrey300: '#caccd0',
  colorGrey400: '#a6b1c0',
  colorGrey500: '#808080',
  colorGreen100: '#2db4ab',
  colorGreen200: '#349d27',
  colorGreen300: '#117104',
  colorOrange100: '#ff981d',

  // font sizes
  fontSizeXS1: '12px',
  fontSizeXS2: '13px',
  fontSizeS1: '14px',
  fontSizeS2: '15px',
  fontSizeM1: '16px',
  fontSizeM2: '18px',
  fontSizeL1: '22px',
  fontSizeL2: '26px',
  fontSizeXL: '34px',

  // font weights
  fontWeightNormal: '400',
  fontWeightBold: '700',

  /// ///// OLD /////
  // colors
  primaryColor: '#404348',
  secondaryColor: '#5F656C',

  // color list:
  // badge background colors
  badge: {
    backgroundColor: {
      hasAllNoticesRead: '#a6b1c0',
      hasUnreadNotices: '#DB0D0D'
    }
  },

  // scren sizes:
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
  }
};

export default theme;
