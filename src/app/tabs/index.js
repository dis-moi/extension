export default function(tabs, {findMatchingOffers, dispatch, contentCode, contentStyle}){

    const matchingTabIdToPortP = new Map();
    
    function createContentScriptAndPort(tabId){
        const tabPortP = new Promise(resolve => {
            tabs.executeScript(tabId, {
                code: contentCode,
                runAt: 'document_end'
            }, () => {
                const tabPort = chrome.tabs.connect(tabId);
                tabPort.onDisconnect.addListener(() => {
                    console.log('port in background was disconnected for tab', tabId);
                    matchingTabIdToPortP.delete(tabId);
                });

                tabPort.onMessage.addListener(msg => {
                    console.log('message from content script', msg);

                    if(msg.type === 'redux-action')
                        dispatch(msg.action);
                });

                tabPort.postMessage({type: 'init', style: contentStyle});

                resolve(tabPort);
            });
        })

        matchingTabIdToPortP.set(tabId, tabPortP);
        
        return tabPortP;
    }

    function sendOffersToTab(tabId, offers){
        console.log('before execute', tabId);
        
        const tabPortP = matchingTabIdToPortP.get(tabId) || createContentScriptAndPort(tabId);
        tabPortP
        .then(tabPort => tabPort.postMessage({type: 'alternative', alternative: {matchingOffers: offers}}))
    }


    tabs.onCreated.addListener( ({id, url}) => {
        const offers = findMatchingOffers(url);

        if(offers.length >= 1){
            sendOffersToTab(id, offers)
        }
    });

    tabs.onUpdated.addListener( (id, {newUrl}, {url}) => {
        const offers = findMatchingOffers(newUrl || url);

        if(offers.length >= 1){
            sendOffersToTab(id, offers);
        }
        else{
            matchingTabIdToPortP.delete(id);
        }
    });

    tabs.onRemoved.addListener( id => {
        matchingTabIdToPortP.delete(id);
    });

}