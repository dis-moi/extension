/* global chai, chaiAsPromised, WebConsole */

import loadBasicTests from './basic';
import loadNavigationsTests from './navigations';

mocha.setup({
  ui: 'bdd',
  reporter: WebConsole
});

chai.use(chaiAsPromised);

window.integrationTest = function() {
  loadBasicTests();
  loadNavigationsTests();

  mocha.run();
};
