import µBlock from './uriTools';

const vAPI = {};

/******************************************************************************/
/******************************************************************************/

vAPI.net = {};

/******************************************************************************/

vAPI.net.registerListeners = function() {
    var µb = µBlock;
    var µburi = µb.URI;

    var normalizeRequestDetails = function(details) {
        details.tabId = details.tabId.toString();
        details.hostname = µburi.hostnameFromURI(details.url);

        // The rest of the function code is to normalize type
        if ( details.type !== 'other' ) {
            return;
        }

        details.type = 'object';
    };

    var headerValue = function(headers, name) {
        var i = headers.length;
        while ( i-- ) {
            if ( headers[i].name.toLowerCase() === name ) {
                return headers[i].value.trim();
            }
        }
        return '';
    };

    var onBeforeRequestClient = this.onBeforeRequest.callback;

    var onBeforeRequest = function(details) {
        normalizeRequestDetails(details);
        return onBeforeRequestClient(details);
    };

    var installListeners = (function() {
        var crapi = chrome.webRequest;
        var listener = onBeforeRequest;

        if ( crapi.onBeforeRequest.hasListener(listener) === false ) {
            crapi.onBeforeRequest.addListener(
                listener,
                {
                    'urls': this.onBeforeRequest.urls || ['<all_urls>'],
                    'types': this.onBeforeRequest.types || undefined
                },
                this.onBeforeRequest.extra
            );
        }

    }).bind(this);

    installListeners();
};

export default vAPI;