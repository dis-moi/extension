export default {
  // fonts colors
  mainText: '#25265e',
  otherText: '#787993',

  // icons colors
  warningFav: {
    color: '#FB6C6A',
    background: '#FEF0F0',
  },
  approval: {
    color: '#2DC76D',
    background: '#EAF9F0',
  },
  alternative: {
    color: '#488FC1',
    background: '#F0F5FA',
  },
  needHelp: {
    color: '#F5A623',
    background: '#FDF9C6',
  },
  rant: {
    color: '#9013FE',
    background: '#F3E7FE',
  },
  sadness: {
    color: '#D16464',
    background: '#FAEFEF',
  },
  surprise: {
    color: '#3C6AE2',
    background: '#EBF0FC',
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
