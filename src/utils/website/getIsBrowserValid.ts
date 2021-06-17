import { Browser, getBrowser } from './getBrowser';

export const getIsBrowserValid = (browser?: Browser): boolean => {
  return /firefox|chrome/i.test(browser || getBrowser);
};
