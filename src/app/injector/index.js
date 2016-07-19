import AlternativesInjector from './alternatives'

export default {
    init: function(vAPI, contentCode, style, store) {
        new AlternativesInjector(vAPI, contentCode, style).listen(store);
    }
}