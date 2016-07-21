/* eslint-disable */
'use strict';
/* eslint-enable */

const interval = setInterval(() => {
  if (document.querySelector('iframe#lmemFrame')) {
    chrome.runtime.sendMessage({
      type: 'IFRAME_OPEN',
      ok: true
    });
    clearInterval(interval);
  }
}, 500);
