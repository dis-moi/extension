import chai from 'chai';

import { makeUrlFromFilters } from '../../src/app/actions/kraftBackend';
import { makeRecoFeedback } from '../../src/app/tabs';

const expect = chai.expect;

describe('background makeUrlFromFilters', function () {
  it('only criteria', () => {
    const criteria = ['crit1', 'crit2'];
    const url = makeUrlFromFilters(criteria, []);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('criteria=crit1,crit2');
  });

  it('only editors', () => {
    const editors = ['edit1', 'edit2'];
    const url = makeUrlFromFilters([], editors);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('excluded_editors=edit1,edit2');
  });

  it('criteria and editors', () => {
    const criteria = ['crit1', 'crit2'];
    const editors = ['edit1', 'edit2'];
    const url = makeUrlFromFilters(criteria, editors);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('criteria=crit1,crit2&excluded_editors=edit1,edit2');
  });
});

describe('background makeRecoFeedback', function () {
  it('should have right feedback and contexts', () => {
    const type = 'TESTING_TYPE';
    const url = 'myUrl';

    const output = makeRecoFeedback(type, url);

    expect(output.feedback).to.equal(type.split('_')[0].toLowerCase());
    expect(output.contexts.datetime).to.be.a('string').of.length(24);
    expect(output.contexts.url).to.equal(url);
  });

});
