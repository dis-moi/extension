/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
window.browser =
  typeof chrome !== 'undefined'
    ? chrome
    : typeof browser !== 'undefined'
    ? browser
    : {};
