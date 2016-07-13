import * as _ from 'lodash';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from '../constants/assetsUrls';

class AlternativesInjector {

    constructor(vAPI, contentCode, style) {
        this.vAPI = vAPI;
        this.contentCode = contentCode;
        this.style = style;
        console.log('contentCode', contentCode.length);
        this.tabIdToPort = new Map();
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

    injectHeap(){
         return 'console.log("Injecting heap analytics"); \
                let injectScript= document.createElement("script"); \
                injectScript.type = "text/javascript"; \
                injectScript.async = true; \
                injectScript.src = "https://ui.lmem.net/js/heap.js"; \
                document.getElementsByTagName("head")[0].appendChild(injectScript);';
    }

    renderForEachTab(state) {
        console.log('renderForEachTab');

        _.forIn(state.matchingTabs, (alternative, tabId) => {
            tabId = Number(tabId);

            chrome.tabs.get(tabId, (tab) => {
                if(!tab){
                    this.tabIdToPort.delete(tabId);
                    return;
                }

                let tabPort = this.tabIdToPort.get(tabId);
                console.log('tabPort for', tabId, tabPort);

                // Currently, renderForEachTab is called on every HTTP request
                // On Chrome, when the user clicks, the HTTP request is triggered
                // before the document unloads (and before the next loads obviously)
                // Without this setTimeout, the script would be injected to the
                // to-be-unloaded.
                // See https://github.com/insitu-project/proto-ext/issues/14 for a
                // potentially more robust solution
                setTimeout(() => {
                    console.log('before execute', tabId, tab.url);
                    this.vAPI.tabs.injectScript(tabId, {
                        code: this.contentCode,
                        runAt: 'document_end'
                    }, () => {
                        console.log('after execute');
                        const tabPort = chrome.tabs.connect(tabId);
                        tabPort.onDisconnect.addListener(() => {
                            console.log('port in background was disconnected for tab', tabId);
                            this.tabIdToPort.delete(tabId, tabPort);
                        });

                        this.tabIdToPort.set(tabId, tabPort);
                        tabPort.postMessage({type: 'init', style: this.style});
                        tabPort.postMessage({type: 'alternative', alternative});
                    });
                    this.vAPI.tabs.injectScript(tabId, {
                        code: this.injectHeap(),
                        runAt: 'document_end'
                    });
                }, 1500);

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
