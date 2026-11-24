import { expect } from 'chai';
import loadScript from './loadScript';

describe('ui > website > loadScript', function () {
  const scriptsFor = (src: string) =>
    Array.from(document.querySelectorAll<HTMLScriptElement>('script')).filter(
      (script) => script.getAttribute('src') === src,
    );

  afterEach(() => {
    document.querySelectorAll('script').forEach((script) => script.remove());
  });

  it('adds the script to the document and resolves once it is loaded', async () => {
    const loading = loadScript('/script/loaded.js');
    const [script] = scriptsFor('/script/loaded.js');

    script.dispatchEvent(new window.Event('load'));

    await loading;
    expect(scriptsFor('/script/loaded.js')).to.have.lengthOf(1);
  });

  it('does not load the same script twice', async () => {
    const first = loadScript('/script/once.js');
    const second = loadScript('/script/once.js');
    const scripts = scriptsFor('/script/once.js');

    scripts[0].dispatchEvent(new window.Event('load'));

    await Promise.all([first, second]);
    expect(scripts).to.have.lengthOf(1);
  });

  it('fails when the script cannot be loaded, and lets a later call retry', async () => {
    const failing = loadScript('/script/missing.js');
    scriptsFor('/script/missing.js')[0].dispatchEvent(
      new window.Event('error'),
    );

    let failure: Error | undefined;
    await failing.catch((error: Error) => {
      failure = error;
    });
    expect(failure?.message).to.contain('/script/missing.js');

    const retrying = loadScript('/script/missing.js');
    const scripts = scriptsFor('/script/missing.js');
    expect(scripts).to.have.lengthOf(1);
    scripts[0].dispatchEvent(new window.Event('load'));
    await retrying;
  });
});
