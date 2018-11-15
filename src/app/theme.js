export default {
  main: 'purple',

  // fonts colors
  mainText: '#25265e',
  otherText: '#787993',

  // icons colors
  warningFav: '#FB6C6A',
  approval: '#2DC76D',
  alternative: '#488FC1',
  needHelp: '#F5A623',
  rant: '#9013FE',
  sadness: '#D16464',
  surprise: '#3C6AE2',

  //icons backgrounds
  BGWarningFav: '#FEF0F0',
  BGApproval: '#EAF9F0',
  BGAlternative: '#F0F5FA',
  BGNeedHelp: '#FDF9C6',
  BGRant: '#F3E7FE',
  BGSadness: '#FAEFEF',
  BGSurprise: '#EBF0FC',

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
