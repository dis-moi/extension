import { InstalledDetails } from './types';

export default new Promise<InstalledDetails>(resolve =>
  browser.runtime.onInstalled.addListener(details => resolve(details))
);
