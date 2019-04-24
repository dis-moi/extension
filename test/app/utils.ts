import chai from 'chai';

import { makeRecoFeedback } from '../../src/app/background/middlewares/sendFeedback';

const expect = chai.expect;

describe('background makeRecoFeedback', function() {
  it('should have right feedback and contexts', () => {
    const type = 'like';
    const url = 'myUrl';

    const output = makeRecoFeedback(type, url);

    expect(output.feedback).to.equal('like');
    expect(output.contexts.datetime)
      .to.be.a('string')
      .of.length(24);
    expect(output.contexts.url).to.equal(url);
  });
});
