import chai from 'chai';
import sinonChai from 'sinon-chai';
import { receivedMatchingContexts } from 'app/actions/refreshMatchingContexts';
import { contextTriggered } from 'app/actions/tabs';
import { noticeDisplayed, noticeIgnored } from 'app/actions/notices';
import { MatchingContext } from '../../src/app/lmem/matchingContext';
import { StatefulNotice } from '../../src/app/lmem/notice';
import Tab from '../../src/app/lmem/tab';
import { generateStatefulNotice } from 'test/fakers/generateNotice';

const expect = chai.expect;
chai.use(sinonChai);

const tab: Tab = { id: 1, url: 'http://tests.menant-benjamin.fr/' };

const notice: StatefulNotice = generateStatefulNotice();

describe('background actions', function() {
  it('receivedMatchingContexts', () => {
    const matchingContexts: MatchingContext[] = [
      {
        id: 1,
        noticeUrl: 'http://1',
        urlRegex: '/1/',
        noticeId: 42
      },
      {
        id: 2,
        noticeUrl: 'http://2',
        urlRegex: '/2/',
        noticeId: 42
      }
    ];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload).to.equal(matchingContexts);
  });

  it('contextTriggered', () => {
    const triggeredContexts: MatchingContext[] = [];
    const action = contextTriggered(triggeredContexts, tab);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.meta.tab).to.equal(tab);
    expect(action.payload).to.equal(triggeredContexts);
  });

  it('noticeDisplayed', () => {
    const trigger = 'http://trigger';
    const action = noticeDisplayed(notice.id);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload).to.equal(notice.id);
  });

  it('noticeIgnored when notice dismissed', () => {
    const trigger = 'http://trigger';
    const dismissedNotice: StatefulNotice = {
      ...notice,
      state: {
        dismissed: true,
        liked: false,
        disliked: false,
        read: false
      }
    };
    const action = noticeIgnored(dismissedNotice, trigger);

    expect(action.type).to.equal('NOTICE_IGNORED');
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dismissedNotice);
    expect(action.payload.reason).to.equal('dismiss');
  });

  it('noticeIgnored when notice disliked', () => {
    const trigger = 'http://trigger';
    const dislikedNotice: StatefulNotice = {
      ...notice,
      state: {
        dismissed: false,
        liked: false,
        disliked: true,
        read: false
      }
    };
    const action = noticeIgnored(dislikedNotice, trigger);

    expect(action.type).to.equal('NOTICE_IGNORED');
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dislikedNotice);
    expect(action.payload.reason).to.equal('dislike');
  });
});
