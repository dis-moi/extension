import { webRequestLaunched } from '../actions/browsing';

class WebRequestListener {

    constructor(vAPI) {
        this.vAPI = vAPI;
    }

    listen(store) {
        this.vAPI.net.onBeforeRequest = {
            urls: [
                'http://*/*',
                'https://*/*'
            ],
            extra: ['requestBody'],
            types: ['main_frame', 'xmlhttprequest'],
            callback: (details) => {
                const hostname = (new URL(details.url)).hostname;
                const state = store.getState();
                const prefs = state.preferences || {};
                const deactivatedHostnames = (prefs.deactivated && prefs.deactivated.deactivatedWebsites) || new Set();

                let activeURL = true;
                deactivatedHostnames.forEach( deactivated => {
                    if(deactivated === hostname)
                        activeURL = false;
                });
                
                if(activeURL){
                    store.dispatch(webRequestLaunched(details))
                }
            }
        };
    }

}

export default WebRequestListener;