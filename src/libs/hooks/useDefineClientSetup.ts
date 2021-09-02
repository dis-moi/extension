import { useEffect, useState } from 'react';
import { getBrowser, Browser } from '../../utils/website/getBrowser';
import { getIsBrowserValid } from '../../utils/website/getIsBrowserValid';
import { getPlatform, Platform } from '../../utils/website/getPlatform';
import { getIsMobile } from '../../utils/website/getIsMobile';

interface ClientSetup {
  currentBrowser?: Browser;
  isBrowserValid: boolean;
  currentPlatform?: Platform;
  isMobile: boolean;
}

const initClientSetup: ClientSetup = {
  currentBrowser: '',
  isBrowserValid: false,
  currentPlatform: '',
  isMobile: false
};

const useDefineClientSetup = (
  browser?: Browser,
  platform?: Platform
): ClientSetup => {
  const [clientSetup, setClientSetup] = useState<ClientSetup>(initClientSetup);
  useEffect(() => {
    const currentBrowser = browser || getBrowser(navigator);
    const currentPlatform = platform || getPlatform(window);

    setClientSetup({
      currentBrowser,
      currentPlatform,
      isBrowserValid: getIsBrowserValid(currentBrowser),
      isMobile: getIsMobile(currentPlatform)
    });
  }, []);

  return clientSetup;
};
export default useDefineClientSetup;
