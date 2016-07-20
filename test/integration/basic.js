const MATCHING_URL = "https://www.amazon.fr/Kindle-%C3%A9cran-tactile-antireflet-Wi-Fi/dp/B00KDRUCJY";
const NON_MATCHING_URL = "http://www.aljazeera.com/programmes/witness/2016/01/paris-voice-suburbs-160103095138746.html";

const expect = chai.expect;

const IFRAME_SHOULD_OPEN_WITHIN_DELAY = 8*1000;

function assertIframeOpen(tabId){
    return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(tabId, {
            file: './test/integration/content/assertIframeOpen.js',
            runAt: 'document_start'
        })

        chrome.runtime.onMessage.addListener( (msg, {tab: {id: messageTabId}}) => {
            console.log('message from content', msg, messageTabId, tabId)
            if(messageTabId !== tabId || msg.type !== 'IFRAME_OPEN')
                return; // ignore messages from other tabs or other content script

            if(msg.error){
                reject(message.error)
                return;
            }

            resolve(msg.ok)
        })
    })
    
}

export default function(){
    describe('Basic tests', () => {

        it('should open the iframe on a matching url', function(){
            this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY);
            let tabId;

            const iframeOpenedP = new Promise( (resolve, reject) => {
                chrome.tabs.create({url: MATCHING_URL}, tab => {
                    tabId = tab.id;
                    resolve(assertIframeOpen(tab.id))
                })
            })

            const result = Promise.all([
                expect(iframeOpenedP).to.eventually.be.true
            ])

            result
            .then( () => chrome.tabs.remove(tabId) )
            .catch( () => chrome.tabs.remove(tabId) )

            return result;
        });

        it('should not open the iframe on a non-matching url', function(){
            this.timeout(IFRAME_SHOULD_OPEN_WITHIN_DELAY + 1000);
            let tabId;
            let iframeOpened = false;

            chrome.tabs.create({url: NON_MATCHING_URL}, tab => {
                tabId = tab.id;
                assertIframeOpen(tabId)
                .then(() => iframeOpened = true);
            })

            const iframeDidNotOpeTimeoutP = new Promise( resolve => {
                setTimeout(resolve, IFRAME_SHOULD_OPEN_WITHIN_DELAY)
            })

            const result = iframeDidNotOpeTimeoutP
            .then(() => {
                if(iframeOpened)
                    throw new Error('iframe did open')
            });

            result
            .then( () => chrome.tabs.remove(tabId) )
            .catch( () => chrome.tabs.remove(tabId) )

            return result;
        });


    })
}