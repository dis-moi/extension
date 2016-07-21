/* global chai */
/* eslint max-len: "off", no-return-assign: "off" */

import assertIframeOpen from './shared/assertIframeOpen';

const MATCHING_URL = 'http://www.samsung.com/fr/galaxys6/';
const NON_MATCHING_URL = 'http://thevarguy.com/open-source-application-software-companies/open-source-hardware-what-it-means-and-why-it-matters';

const expect = chai.expect;

const IFRAME_SHOULD_OPEN_WITHIN_DELAY = 8 * 1000;



export default function () {
  describe('Basic tests', () => {

    it('should open the iframe on a matching url', function () {
      this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY);
      let tabId;

      const iframeOpenedP = new Promise((resolve, reject) => {
        chrome.tabs.create({ url: MATCHING_URL }, tab => {
          tabId = tab.id;
          resolve(assertIframeOpen(tab.id));
        });
      });

      const result = Promise.all([
        expect(iframeOpenedP).to.eventually.be.true
      ]);

      result
            .then(() => chrome.tabs.remove(tabId))
            .catch(() => chrome.tabs.remove(tabId));

      return result;
    });

    it('should not open the iframe on a non-matching url', function () {
      this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY + 1000);
      let tabId;
      let iframeOpened = false;

      chrome.tabs.create({ url: NON_MATCHING_URL }, tab => {
        tabId = tab.id;
        assertIframeOpen(tabId)
                .then(() => iframeOpened = true);
      });

      const iframeDidNotOpeTimeoutP = new Promise(resolve => {
        setTimeout(resolve, IFRAME_SHOULD_OPEN_WITHIN_DELAY);
      });

      const result = iframeDidNotOpeTimeoutP
            .then(() => {
              if (iframeOpened)
                throw new Error('iframe did open');
            });

      result
            .then(() => chrome.tabs.remove(tabId))
            .catch(() => chrome.tabs.remove(tabId));

      return result;
    });


  });
}