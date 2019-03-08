import chai from 'chai';

import { makeUrlFromFilters } from '../../src/app/background/actions/kraftBackend';
import { makeRecoFeedback } from '../../src/app/background/middlewares/sendFeedback';
import { LIKE_NOTICE } from '../../src/app/constants/ActionTypes';
import isAction from "../../src/app/utils/isAction";
import createAction from "../../src/app/utils/createAction";

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
    const type = LIKE_NOTICE;
    const url = 'myUrl';

    const output = makeRecoFeedback(type, url);

    expect(output.feedback).to.equal('like');
    expect(output.contexts.datetime).to.be.a('string').of.length(24);
    expect(output.contexts.url).to.equal(url);
  });

  it('should throw an error on wrong feedback type', () => {
    const type =  'WRONG_TYPE';
    const url = 'myUrl';

    expect(makeRecoFeedback.bind(makeRecoFeedback, type, url)).to.throw();
  });

});

describe('isAction', () => {
  const standardActionWithError = {
    type: 'type',
    payload: new Error(),
    error: true,
    meta: { tab: 1 }
  };

  it('shall return true for a standard action', () => {
    expect(isAction(standardActionWithError)).to.equal(true);
  });

  it('shall return true for an action created with the action creator', () => {
    const action = createAction('type')('payload');

    expect(isAction(action)).to.equal(true);
  });

  it('shall return false when an extra key is found', () => {
    const action = {
      ...standardActionWithError,
      extraKey: 'extra'
    };

    expect(isAction(action)).to.equal(false);
  });
});
