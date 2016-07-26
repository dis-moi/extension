export default {
    port: undefined,

    postMessage(msg){ this.port.postMessage(msg) },

    sendBackgroundReduxAction(backgroundAction){
        this.postMessage({
            type: 'redux-action',
            action: backgroundAction
        })
    }

}