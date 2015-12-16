import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Root from 'app/containers/Root';

class AlternativesInjector {

    construct(vAPI) {
        this.vAPI = vAPI;
    }

    listen(store) {
        store.subscribe((store) => {
            console.log(this.renderReact());
            //this.vAPI.tabs.injectScript()
        });
    }

    buildDom() {
        window.addEventListener('load', () => {

        });
    }

    renderReact(tabId) {
        return renderToStaticMarkup(
            <Root store={store} tabId={tabId} />
        );
    }

}

export default AlternativesInjector;