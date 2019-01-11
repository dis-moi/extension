export default {
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

  // new types:
  approval: '#34C16C',
  disapproval: '#F70B7B',
  tip: '#E3C51F',
  alternative: '#49B6D6',
  other: '#EB950C',


  // bulle type colors
  bulleTypes: {
    Disapproval: {
      background: '#F70B7B',
    },
    Alternative: {
      background: '#49B6D6',
    },
    Approval: {
      background: '#34C16C',
    },
    Tip: {
      background: '#E3C51F',
    },
    Other: {
      background: '#EB950C',
    }
  },
  // iframe
  iframe: {
    style: {
      maxWidth: 'initial',
      minWidth: 'initial',
      minHeight: 'initial',
      maxHeight: 'initial',
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 2147483647, // Max z-index value (signed 32bits integer)
      background: '#FDF6E3', // UI bg color (avoid having a transparent iframe after injection)
      border: 'none',
      transition: 'height .1s',
      boxShadow: '0 0 15px #888',
    },
  }
};
