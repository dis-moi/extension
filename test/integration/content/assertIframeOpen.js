/* eslint-disable */
'use strict';
/* eslint-enable */

import { iFrameId } from '../../../apps/extension/src/constants/iframe';

const interval = setInterval(() => {
  if (document.querySelector(`iframe#${iFrameId}`)) {
    chrome.runtime.sendMessage({
      type: 'IFRAME_OPEN',
      ok: true
    });
    clearInterval(interval);
  }
}, 500);
