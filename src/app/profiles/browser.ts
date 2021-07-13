/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
window.browser =
  typeof chrome !== 'undefined'
    ? chrome
    : typeof browser !== 'undefined'
    ? browser
    : {};
