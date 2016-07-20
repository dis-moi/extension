export default function assertIframeOpen(tabId){
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