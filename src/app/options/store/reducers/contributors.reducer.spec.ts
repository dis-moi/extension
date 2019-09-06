/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { CloseCause } from 'app/lmem/ui';
import {
  closed,
  contributorsTransmitted,
  ContributorsTransmittedAction
} from 'app/actions';
import contributorsReducer from './contributors.reducer';
import { generateContributor } from 'test/fakers/generateContributor';

describe('options > reducers > contributors', function() {
  it('is empty initially', () => {
    expect(contributorsReducer(undefined, closed(CloseCause.CloseButton))).to.be
      .empty;
  });
  it('saves contributors', () => {
    const contributorOne = generateContributor();
    const contributorTwo = generateContributor();
    const contributorThree = generateContributor();
    const transmitContributorsAction: ContributorsTransmittedAction = contributorsTransmitted(
      [contributorOne, contributorTwo, contributorThree]
    );

    expect(contributorsReducer([], transmitContributorsAction)).to.eql([
      contributorOne,
      contributorTwo,
      contributorThree
    ]);
  });
});
