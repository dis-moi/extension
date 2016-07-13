import * as _ from 'lodash';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

class AlternativesInjector {

    constructor(vAPI, contentCode) {
        this.vAPI = vAPI;
        this.contentCode = contentCode;
    }

    listen(store) {
        store.subscribe(() => {
            this.renderForEachTab(store.getState());
        });
    }

    /*buildDom(component) {
        return  "console.log('Prepare to inject'); \
                function ready(f){ /in/.test(document.readyState) ? setTimeout(ready,90,f):f() }; \
                 ready(function() { \
                    console.log('LMEM injection'); \
                    var iframe = document.createElement('iframe'); \
                    iframe.id = 'lmemFrame'; \
                    iframe.width = '100%'; \
                    iframe.height = '255px'; \
                    iframe.style.position = 'fixed'; \
                    iframe.style.bottom = '0px'; \
                    iframe.style.left = '0px'; \
                    iframe.style.right = '0px'; \
                    iframe.style.zIndex = '999999999'; \
                    iframe.onload = function() { \
                        var doc = iframe.contentDocument || iframe.contentWindow.document; \
                        var div = doc.createElement('div'); \
                        div.innerHTML = '"+ component +"'; \
                        doc.body.appendChild(div); \
                    }; \
                    document.body.appendChild(iframe); \
                });";
    }*/

    renderForEachTab(state) {
        console.log('renderForEachTab');

        _.forIn(state.matchingTabs, (alternative, tabId) => {
            tabId = Number(tabId);

            chrome.tabs.get(tabId, (tab) => {
                console.log('before execute', tabId, tab.url);
                this.vAPI.tabs.injectScript(tabId, {
                    code: this.contentCode,
                    runAt: 'document_end'
                }, function(){
                    const tabPort = chrome.tabs.connect(tabId);
                    tabPort.onDisconnect.addListener(() => {
                        console.log('port in background was disconnected for tab', tabId);
                    })
                    tabPort.postMessage(alternative);
                });
            })
            
        });
        
    }

    /*renderForTab(tabId, alternative) {
        var recommendation = alternative.matchingOffers[0].recommendation;
        var stylesUrl = STYLES_URL + 'alt.css';
        return renderToStaticMarkup(
            <Alternative recommendation={recommendation} stylesUrl={stylesUrl} imagesUrl={IMAGES_URL} />
        )
    }*/
}

export default AlternativesInjector;
