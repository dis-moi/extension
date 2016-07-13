import AlternativesInjector from './alternatives'

export default {
    init: function(vAPI, contentCode, store) {
        new AlternativesInjector(vAPI, contentCode).listen(store);
    }
}