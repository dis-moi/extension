import { getPlatform, Platform } from './getPlatform';

export const getIsMobile = (platform?: Platform): boolean => {
  return /ios|android/i.test(platform || getPlatform);
};
