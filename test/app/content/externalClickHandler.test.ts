import chai from 'chai';
import { JSDOM } from 'jsdom';
import { isEventPathInteractive } from '../../../src/libs/utils/isEventPathInteractive';

const expect = chai.expect;

const dom = new JSDOM();
const document = dom.window.document;

describe('isHtmlElementInteractive', () => {
  it('can tell if actual Html elements are interactive', () => {
    expect(isEventPathInteractive([document.createElement('a')])).to.be.true;
    expect(
      isEventPathInteractive([
        document.createElement('span'),
        document.createElement('button')
      ])
    ).to.be.true;
  });
  it('can tell if actual Html elements are interactive with onclick attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('onClick', '() => {}');
    console.log(element);

    expect(isEventPathInteractive([element])).to.be.true;
  });
  it('can tell if actual Html elements are NOT interactive', () => {
    expect(isEventPathInteractive([document.createElement('span')])).to.be
      .false;
  });
});
