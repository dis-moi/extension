import loadBasicTests from './basic';
import loadNavigationsTests from './navigations';

mocha.setup({
    ui: 'bdd',
    reporter: WebConsole
})

chai.use(chaiAsPromised);

export default window.integrationTest = function(){
    loadBasicTests();
    loadNavigationsTests();
    
    mocha.run()
}