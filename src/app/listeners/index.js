import webRequest from './webRequest'

export default {
    init: function(vAPI, store) {
        new webRequest(vAPI).listen(store);

        vAPI.net.registerListeners();
    }
}