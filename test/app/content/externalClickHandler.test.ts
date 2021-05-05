import chai from 'chai';
import { JSDOM } from 'jsdom';
import { isHtmlElementInteractive } from '../../../apps/content/src/externalClickHandler';

const expect = chai.expect;

const dom = new JSDOM();
const document = dom.window.document;

describe('isHtmlElementInteractive', () => {
  it('can tell if actual Html elements are interactive', () => {
    expect(isHtmlElementInteractive(document.createElement('a'))).to.be.true;
    expect(isHtmlElementInteractive(document.createElement('button'))).to.be
      .true;

    const element = document.createElement('div');
    element.setAttribute('onClick', '() => {}');

    expect(isHtmlElementInteractive(element)).to.be.true;
  });
});
