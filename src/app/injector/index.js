import * as _ from 'lodash';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

export default class AlternativesInjector {

    constructor(vAPI, contentCode, style, store) {
        this.vAPI = vAPI;
        this.contentCode = contentCode;
        this.style = style;
        console.log('contentCode', contentCode.length);
        this.tabIdToPort = new Map();

        this.store = store;

        store.subscribe(() => {
            this.renderForEachTab(store.getState());
        });
    }

    renderForEachTab(state) {
        const deactivatedEverywhereUntilPref =
            state.preferences &&
            state.preferences.deactivated &&
            state.preferences.deactivated.deactivatedEverywhereUntil &&
            new Date(state.preferences.deactivated.deactivatedEverywhereUntil);
        const keepClosedUntil = deactivatedEverywhereUntilPref || Date.now();

        const matchingTabs = state.matchingTabs || {};

        if(keepClosedUntil <= Date.now()){
            _.forIn(matchingTabs, (alternative, tabId) => {
                tabId = Number(tabId);

                chrome.tabs.get(tabId, (tab) => {
                    if(!tab){
                        this.tabIdToPort.delete(tabId);
                        return;
                    }

                    setTimeout(() => {
                        console.log('before execute', tabId, tab.url);
                        this.vAPI.tabs.injectScript(tabId, {
                            code: this.contentCode,
                            runAt: 'document_end'
                        }, () => {
                            console.log('after execute');
                            const tabPort = chrome.tabs.connect(tabId);
                            this.tabIdToPort.set(tabId, tabPort);

                            tabPort.onDisconnect.addListener(() => {
                                console.log('port in background was disconnected for tab', tabId);
                                this.tabIdToPort.delete(tabId, tabPort);
                            });

                            tabPort.onMessage.addListener(msg => {
                                console.log('message from content script', msg);

                                if(msg.type === 'redux-action')
                                    this.store.dispatch(msg.action);
                            })
                            
                            tabPort.postMessage({type: 'init', style: this.style});
                            tabPort.postMessage({type: 'alternative', alternative});
                        });
                    }, 1500);
                        
                })
                
            });

        }
        
    }
}

