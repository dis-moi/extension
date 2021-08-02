import chai from 'chai';
import sinonChai from 'sinon-chai';
import { receivedMatchingContexts } from 'libs/store/actions/refreshMatchingContexts';
import { contextTriggered } from 'libs/store/actions/tabs';
import { noticeDisplayed, noticeIgnored } from 'libs/store/actions/notices';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
import Tab from 'libs/domain/tab';
import { StatefulNotice } from 'libs/domain/notice';
import { MatchingContext } from 'libs/domain/matchingContext';
import { ContributorId } from 'libs/domain/contributor';

const expect = chai.expect;
chai.use(sinonChai);

const tab: Tab = { id: 1, url: 'https://tests.menant-benjamin.fr/' };

const notice: StatefulNotice = generateStatefulNotice();

describe('background actions', function() {
  it('receivedMatchingContexts', () => {
    const matchingContexts: MatchingContext[] = [
      {
        id: 1,
        noticeUrl: 'https://1',
        urlRegex: '/1/',
        noticeId: 42
      } as MatchingContext,
      {
        id: 2,
        noticeUrl: 'https://2',
        urlRegex: '/2/',
        noticeId: 42
      } as MatchingContext
    ];
    const action = receivedMatchingContexts(
      100 as ContributorId,
      matchingContexts
    );

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload).to.deep.equal({
      contributorId: 100,
      matchingContexts
    });
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
    const action = noticeDisplayed(notice.id);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload).to.equal(notice.id);
  });

  it('noticeIgnored when notice dismissed', () => {
    const trigger = 'https://trigger';
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
    const trigger = 'https://trigger';
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
