import { expect } from 'chai';
import resourcesReducer from './resources.reducer';
import { receivedMatchingContexts } from 'app/actions/refreshMatchingContexts';
import { MatchingContext } from 'app/lmem/matchingContext';

describe('background > reducers > resources', function() {
  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts: MatchingContext[] = [
      { noticeUrl: 'http://1', urlRegex: '/1/', noticeId: 42 },
      { noticeUrl: 'http://2', urlRegex: '/2/', noticeId: 42 }
    ];

    const action = receivedMatchingContexts(matchingContexts);

    const nextState = resourcesReducer(undefined, action);

    expect(nextState.matchingContexts).to.have.lengthOf(
      matchingContexts.length
    );
  });
});
