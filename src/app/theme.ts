export interface Theme {
  main: string;
  // colors
  primaryColor: string;
  activeColor: string;
  otherText: string;
  secondaryColor: string;
  deletedText: string;
  listBg: string;
  navInactive: string;
  navActive: string;
  link: string;
  accountListBg: string;

  // color list:
  typeBg: string;
  bottomBar: string;
  topBarNavInactiveDeleteBg: string;
  formBorder: string;
  text: string;
  error: string;
  formError: string;
  button: string;

  // badge background colors
  badge: {
    backgroundColor: {
      read: string;
      unread: string;
    };
  };

  // new types:
  approval: string;
  disapproval: string;
  tip: string;
  alternative: string;
  other: string;

  // notice type colors
  noticeTypes: {
    Disapproval: {
      background: string;
    };
    Alternative: {
      background: string;
    };
    Approval: {
      background: string;
    };
    Tip: {
      background: string;
    };
    Other: {
      background: string;
    };
  };
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
    };
  };
}

export const theme = {
  main: 'purple',
  // colors
  primaryColor: '#404348',
  activeColor: '#0C52B4',
  otherText: '#787993',
  secondaryColor: '#5F656C',
  deletedText: '#484046',
  listBg: '#EFEDED',
  navInactive: '#a6b1c0',
  navActive: '#4378A5',
  link: '#1974C3',
  accountListBg: '#fff',

  // color list:
  typeBg: '#EBEBEB',
  bottomBar: '#DDDDDD',
  topBarNavInactiveDeleteBg: '#A6B1C0',
  formBorder: '#707070',
  text: '#404348',
  error: '#F01953',
  formError: '#DB0D0D',
  button: '#1ECCB5',

  // badge background colors
  badge: {
    backgroundColor: {
      read: '#9DA1A7',
      unread: '#DB0D0D'
    }
  },

  // new types:
  approval: '#34C16C',
  disapproval: '#F70B7B',
  tip: '#E3C51F',
  alternative: '#49B6D6',
  other: '#EB950C',

  // notice type colors
  noticeTypes: {
    Disapproval: {
      background: '#F70B7B'
    },
    Alternative: {
      background: '#49B6D6'
    },
    Approval: {
      background: '#34C16C'
    },
    Tip: {
      background: '#E3C51F'
    },
    Other: {
      background: '#EB950C'
    }
  },
  // iframe
  iframe: {
    style: {
      'max-width': 'initial',
      'min-width': 'initial',
      'min-height': 'initial',
      'max-height': 'initial',
      position: 'fixed',
      top: '20px',
      right: '20px',
      'z-index': 2147483647, // Max z-index value (signed 32bits integer)
      border: 'none',
      transition: 'height .1s',
      width: '390px',
      height: '423px',
      left: 'auto'
    }
  }
};

export default theme;
