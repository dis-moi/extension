
mocha.setup({
    ui: 'bdd',
    reporter: WebConsole
})

export default function(){
    console.log('mocha.run()')
    mocha.run()
}