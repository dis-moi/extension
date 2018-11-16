export default {
  main: 'purple',
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
