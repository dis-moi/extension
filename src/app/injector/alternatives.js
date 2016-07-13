import * as _ from 'lodash';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

class AlternativesInjector {

    constructor(vAPI) {
        this.vAPI = vAPI;
    }

    listen(store) {
        store.subscribe(() => {
            this.renderForEachTab(store.getState());
        });
    }

    buildDom(component) {
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
    }

    injectHeap(){
         return 'console.log("Injecting heap analytics"); \
                let injectScript= document.createElement("script"); \
                injectScript.type = "text/javascript"; \
                injectScript.async = true; \
                injectScript.src = "https://ui.lmem.net/js/heap.js"; \
                document.getElementsByTagName("head")[0].appendChild(injectScript);';
    }

    renderForEachTab(state) {
        setTimeout(()=>{
            _.forIn(state.matchingTabs, (value, key) => {
                this.vAPI.tabs.injectScript(key, {
                    code: this.buildDom(this.renderForTab(key, value)),
                    runAt: 'document_start'
                });
                this.vAPI.tabs.injectScript(key, {
                    code: this.injectHeap(),
                    runAt: 'document_end'
                });
            });
        }, 1500); //we wait for the Dom to be built
    }

    renderForTab(tabId, alternative) {
        var recommendation = alternative.matchingOffers[0].recommendation;
        var stylesUrl = STYLES_URL + 'alt.css';
        return renderToStaticMarkup(
            <Alternative recommendation={recommendation} stylesUrl={stylesUrl} imagesUrl={IMAGES_URL} />
        )
    }
}

export default AlternativesInjector;
