
function isRecommandationBackendURL(url){
    return true;
}

export function prepare(tabs, updateDraftRecommandations){

    function grabDraftRecommandations(tabId){
        tabs.executeScript(tabId, {
            file: chrome.extension.getURL('./js/grabDraftRecommandations.js'),
            runAt: 'document_end'
        }, () => {
            const tabPort = chrome.tabs.connect(tabId);

            tabPort.onMessage.addListener(msg => {
                console.log('message from draft grabing content script', msg);

                updateDraftRecommandations(msg);
            });
        });
    }

    tabs.onCreated.addListener( ({id, url}) => {
        if(isRecommandationBackendURL(url)){
            grabDraftRecommandations(id)
        }
    });

    tabs.onUpdated.addListener( (id, {newUrl}, {url}) => {
        if(isRecommandationBackendURL(newUrl || url)){
            grabDraftRecommandations(id)
        }
    });
}