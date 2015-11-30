import { webRequestLaunched } from '../actions/browsing';

class webRequest {

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
            callback: (details) => store.dispatch(webRequestLaunched(details))
        };
    }

}

export default webRequest;