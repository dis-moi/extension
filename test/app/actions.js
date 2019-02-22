import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors,
  refreshMatchingContextsEvery,
} from '../../src/app/background/actions/kraftBackend';

import { contextTriggered, noticeDisplayed, noticeIgnored } from '../../src/app/background/actions/tabs';

const expect = chai.expect;
chai.use(sinonChai);


describe('background actions', function () {

  it('receivedMatchingContexts', () => {
    const matchingContexts = [{}, {}];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.payload.matchingContexts).to.equal(matchingContexts);
  });

  it('receivedCriteria', () => {
    const criteria = [{}, {}];
    const action = receivedCriteria(criteria);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.payload.criteria).to.equal(criteria);
  });

  it('receivedEditors', () => {
    const editors = [{}, {}];
    const action = receivedEditors(editors);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.payload.editors).to.equal(editors);
  });

  it('contextTriggered', () => {
    const trigger = '';
    const triggeredContexts = [];
    const action = contextTriggered(triggeredContexts, { trigger });

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.meta.trigger).to.equal(trigger);
    expect(action.payload.triggeredContexts).to.equal(triggeredContexts);
  });

  it('noticeDisplayed', () => {
    const trigger = '';
    const notice = {};
    const action = noticeDisplayed(notice, trigger);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.meta.trigger).to.equal(trigger);
    expect(action.payload.notice).to.equal(notice);
  });

  it('noticeIgnored when notice dismissed', () => {
    const trigger = '';
    const notice = { dismissed: true };
    const action = noticeIgnored(notice, trigger);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.meta.trigger).to.equal(trigger);
    expect(action.payload.notice).to.equal(notice);
    expect(action.payload.reason).to.equal('dismiss');
  });

  it('noticeIgnored when notice disliked', () => {
    const trigger = '';
    const notice = { disliked: true };
    const action = noticeIgnored(notice, trigger);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.meta.trigger).to.equal(trigger);
    expect(action.payload.notice).to.equal(notice);
    expect(action.payload.reason).to.equal('dislike');
  });

  describe('auto refresh matching contexts', () => {
    before(() => {
      this.clock = sinon.useFakeTimers();
    });

    it('every x minutes', () => {
      const recursiveFn = refreshMatchingContextsEvery(10000);
      const dispatch = sinon.fake();

      recursiveFn(dispatch);
      expect(dispatch).to.not.have.been.called;

      this.clock.next();
      this.clock.next();
      expect(dispatch).to.have.been.calledTwice;
      expect(dispatch.lastCall.lastArg.type).to.be.a('string').of.length.above(5);
    });

    after(() => {
      this.clock.restore();
    });
  });

});
