import { BadgeTheme } from 'libs/domain/badge';

export interface ButtonTheme {
  default: string;
  hover: string;
  disabled: string;
  action: string;
  radius: string;
}

export interface Theme {
  // Clean start

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
  fontSizeXS: string;
  fontSizeS: string;
  fontSizeM: string;
  fontSizeL: string;
  fontSizeXL: string;

  /// ///// OLD /////
  // colors
  primaryColor: string;

  secondaryColor: string;

  // color list:

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
}

export const theme: Theme = {
  // Clean start

  // radius
  radiusS: '5px',
  radiusM: '8px',
  radiusL: '20px',

  // colors
  colorWhite: '#fff',
  colorBlack: '#000',
  colorPrimary: '#0C52B4',
  colorText: '#22252B',
  colorAlert: '#DB0D0D',
  colorGrey100: '#F5F5F5',
  colorGrey200: '#E9EBEF',
  colorGrey300: '#CACCD0',
  colorGrey400: '#a6b1c0',
  colorGrey500: '#808080',
  colorGreen100: '#2db4ab',
  colorGreen200: '#349d27',
  colorGreen300: '#117104',
  colorOrange100: '#ff981d',

  // font sizes
  fontSizeXS: '13px',
  fontSizeS: '13px',
  fontSizeM: '13px',
  fontSizeL: '13px',
  fontSizeXL: '13px',

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
  }
};

export default theme;
