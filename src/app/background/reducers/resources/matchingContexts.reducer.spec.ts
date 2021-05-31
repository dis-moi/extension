import { expect } from 'chai';
import { MatchingContext } from 'libs/lmem/matchingContext';
import { receivedMatchingContexts, unsubscribe } from 'libs/store/actions';
import { ContributorId } from 'libs/lmem/contributor';
import matchingContextsReducer, {
  MatchingContextsState
} from './matchingContexts.reducer';

const matchingContext1 = {
  id: 1,
  noticeId: 100,
  noticeUrl: 'http://',
  urlRegex: '.*'
} as MatchingContext;
const matchingContext2 = {
  id: 2,
  noticeId: 101,
  noticeUrl: 'http://',
  urlRegex: '.*'
} as MatchingContext;

describe('background > reducers > resources > matchingContexts', () => {
  it('saves new matching contexts when empty', () => {
    const state: MatchingContextsState = {};
    const action = receivedMatchingContexts(42 as ContributorId, [
      matchingContext1
    ]);

    const newState: MatchingContextsState = matchingContextsReducer(
      state,
      action
    );

    expect(Object.values(newState)).to.have.length(1);
    expect(newState['1']).to.deep.include({
      ...matchingContext1,
      associatedContributors: [42]
    });
  });
  it('adds new matching contexts to existing one', () => {
    const state: MatchingContextsState = {
      '2': {
        ...matchingContext2,
        associatedContributors: [41 as ContributorId]
      }
    };
    const action = receivedMatchingContexts(42 as ContributorId, [
      matchingContext1
    ]);

    const newState: MatchingContextsState = matchingContextsReducer(
      state,
      action
    );

    expect(Object.values(newState)).to.have.length(2);
    expect(newState['1']).to.deep.include({
      ...matchingContext1,
      associatedContributors: [42]
    });
    expect(newState['2']).to.deep.include({
      ...matchingContext2,
      associatedContributors: [41]
    });
  });
  it('merge new matching contexts when already associated to contributor', () => {
    const state: MatchingContextsState = {
      '1': {
        ...matchingContext1,
        associatedContributors: [41 as ContributorId]
      }
    };
    const action = receivedMatchingContexts(42 as ContributorId, [
      matchingContext1
    ]);

    const newState: MatchingContextsState = matchingContextsReducer(
      state,
      action
    );

    expect(Object.values(newState)).to.have.length(1);
    expect(newState['1']).to.deep.include({
      ...matchingContext1,
      associatedContributors: [41, 42]
    });
  });
  it('removes corresponding matching contexts on unsubscribe', () => {
    const state: MatchingContextsState = {
      '1': {
        ...matchingContext1,
        associatedContributors: [41, 42] as ContributorId[]
      }
    };
    const stateAfter41Unsusbscribe = matchingContextsReducer(
      state,
      unsubscribe(41 as ContributorId)
    );

    expect(Object.values(stateAfter41Unsusbscribe)).to.have.length(1);
    expect(
      stateAfter41Unsusbscribe['1'].associatedContributors
    ).to.have.members([42]);

    const stateAfter42Subscribe = matchingContextsReducer(
      stateAfter41Unsusbscribe,
      unsubscribe(42 as ContributorId)
    );

    expect(Object.values(stateAfter42Subscribe)).to.have.length(0);
  });
});
