/* global chai */
/* eslint max-len: "off" */

import assertIframeOpen from './shared/assertIframeOpen';

const MATCHING_URL = 'http://www.20minutes.fr/societe/1860259-20160606-violences-policieres-quarante-huit-enquetes-judiciaires-ouvertes-police-polices';
const NON_MATCHING_URL = 'http://thevarguy.com/open-source-application-software-companies/open-source-hardware-what-it-means-and-why-it-matters';

const expect = chai.expect;

const IFRAME_SHOULD_OPEN_WITHIN_DELAY = 8 * 1000;


export default function () {
  describe('Basic tests', () => {

    it('should open the iframe on a matching url after a refresh', function () {
      this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY * 2);
      let tabId;

      const iframeOpenedP = new Promise((resolve, reject) => {
        chrome.tabs.create({ url: MATCHING_URL }, tab => {
          tabId = tab.id;

          setTimeout(() => {
            chrome.tabs.reload(tabId, () => {
                            // waiting for the page to actually refresh
              setTimeout(() => {
                resolve(assertIframeOpen(tabId));
              }, 1500);
            });
          }, IFRAME_SHOULD_OPEN_WITHIN_DELAY / 2);
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

    it('should open the iframe on a matching url after navigation from a non-matching URL', function () {
      this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY * 2);
      let tabId;

      const iframeOpenedP = new Promise((resolve, reject) => {
        chrome.tabs.create({ url: NON_MATCHING_URL }, tab => {
          tabId = tab.id;

          setTimeout(() => {
            chrome.tabs.update(tabId, { url: MATCHING_URL }, () => {
                            // waiting for the page to actually refresh
              setTimeout(() => {
                resolve(assertIframeOpen(tabId));
              }, 1500);
            });
          }, IFRAME_SHOULD_OPEN_WITHIN_DELAY / 2);
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


  });
}