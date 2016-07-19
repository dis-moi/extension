
mocha.setup({
    ui: 'bdd',
    reporter: WebConsole
})

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('yep', () => {

    it('should succeed with 5 tabs', () => {
        const tabsP = new Promise(resolve => {
             chrome.tabs.query({}, resolve); 
        })

        return Promise.all([
            expect(tabsP).to.eventually.be.an.Array,
            expect(tabsP).to.eventually.have.length(5)
        ])
    });

    it('should fail with 5 tabs', () => {
        const tabsP = new Promise(resolve => {
             chrome.tabs.query({}, resolve); 
        })

        return Promise.all([
            expect(tabsP).to.eventually.be.an.Array,
            expect(tabsP).to.eventually.have.length(10)
        ])
    });
})

export default function(){
    console.log('mocha.run()')
    mocha.run()
}