import loadBasicTests from './basic';

mocha.setup({
    ui: 'bdd',
    reporter: WebConsole
})

chai.use(chaiAsPromised);

loadBasicTests();

export default function(){
    console.log('mocha.run()')
    mocha.run()
}