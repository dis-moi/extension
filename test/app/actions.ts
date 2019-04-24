import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  receivedMatchingContexts,
  refreshMatchingContextsEvery
} from '../../src/app/actions/kraftBackend';

import {
  contextTriggered,
  noticeDisplayed,
  noticeIgnored
} from '../../src/app/actions/tabs';
import { MatchingContext } from '../../src/app/lmem/matchingContext';
import { EnhancedNotice } from '../../src/app/lmem/notice';

const expect = chai.expect;
chai.use(sinonChai);

const notice: EnhancedNotice = {
  id: 1,
  title: 'This is a title',
  description: 'This is a notice',
  resource: {
    author: 'Jalil',
    label: 'Jalil\'s feed',
    url: 'http://jalil',
    editor: { id: 1, label: 'editor', url: 'http://editor' }
  },
  contributor: { organization: 'LMEM', name: 'Jalil', image: '' },
  visibility: 'public',
  valid: true,
  alternatives: [],
  criteria: [],
  dislikes: 0,
  filters: [],
  likes: 0,
  disliked: false,
  dismissed: false,
  liked: false
};

describe('background actions', function() {
  it('receivedMatchingContexts', () => {
    const matchingContexts: MatchingContext[] = [
      { recommendation_url: 'http://1', url_regex: '/1/' },
      { recommendation_url: 'http://2', url_regex: '/2/' }
    ];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.matchingContexts).to.equal(matchingContexts);
  });

  it('contextTriggered', () => {
    const trigger = '';
    const triggeredContexts: MatchingContext[] = [];
    const action = contextTriggered(1, trigger, triggeredContexts);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.triggeredContexts).to.equal(triggeredContexts);
  });

  it('noticeDisplayed', () => {
    const trigger = 'http://trigger';
    const action = noticeDisplayed(notice, trigger);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(notice);
  });

  it('noticeIgnored when notice dismissed', () => {
    const trigger = 'http://trigger';
    const dismissedNotice = { ...notice, dismissed: true };
    const action = noticeIgnored(dismissedNotice, trigger);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dismissedNotice);
    expect(action.payload.reason).to.equal('dismiss');
  });

  it('noticeIgnored when notice disliked', () => {
    const trigger = 'http://trigger';
    const dislikedNotice = { ...notice, disliked: true };
    const action = noticeIgnored(dislikedNotice, trigger);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dislikedNotice);
    expect(action.payload.reason).to.equal('dislike');
  });

  describe('auto refresh matching contexts', () => {
    interface SuiteWithClock extends Mocha.Suite {
      clock: { next: () => void; restore: () => void };
    }
    before(() => {
      (this as SuiteWithClock).clock = sinon.useFakeTimers();
    });

    it('every x minutes', () => {
      const self = this as SuiteWithClock;
      const recursiveFn = refreshMatchingContextsEvery(10000);
      const dispatch = sinon.fake();

      recursiveFn(dispatch);
      expect(dispatch).to.not.have.been.called;

      self.clock.next();
      self.clock.next();
      expect(dispatch).to.have.been.calledTwice;
      expect(dispatch.lastCall.lastArg.type)
        .to.be.a('string')
        .of.length.above(5);
    });

    after(() => {
      (this as SuiteWithClock).clock.restore();
    });
  });
});
