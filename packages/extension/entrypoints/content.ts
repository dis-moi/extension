import { init } from '../content';

export default defineContentScript({
  matches: ['*://*/*'],
  excludeMatches: [
    '*://*.googleusercontent.com/viewer/secure/pdf/*',
    '*://*.cdn.mozilla.net/*',
    '*://*.accounts.firefox.com/*',
    '*://*.addons.mozilla.org/*',
    '*://*.input.mozilla.org/*',
    '*://*.install.mozilla.org/*',
    '*://*.support.mozilla.org/*',
    '*://*.services.mozilla.org/*',
    '*://*.testpilot.firefox.com/*',
  ],
  excludeGlobs: [
    '*.pdf*',
    '*.Pdf*',
    '*.PDF*',
    '*.jpeg*',
    '*.jpg*',
    '*.png*',
    '*.gif*',
  ],
  runAt: 'document_end',
  main() {
    init();
  },
});
