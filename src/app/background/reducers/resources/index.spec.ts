import { expect } from 'chai';
import resourcesReducer from './';
import { receivedMatchingContexts } from 'app/actions/refreshMatchingContexts';
import { MatchingContext } from 'app/lmem/matchingContext';
import generateMatchingContext from 'test/fakers/generateMatchingContext';

describe('background > reducers > resources', function() {
  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts: MatchingContext[] = [
      generateMatchingContext(),
      generateMatchingContext()
    ];

    const action = receivedMatchingContexts(matchingContexts);

    const nextState = resourcesReducer(undefined, action);

    expect(nextState.matchingContexts).to.have.lengthOf(
      matchingContexts.length
    );
  });
});
