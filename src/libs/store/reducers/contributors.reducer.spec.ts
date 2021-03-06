/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { CloseCause } from 'libs/domain/ui';
import {
  closed,
  contributorsTransmitted,
  ContributorsTransmittedAction
} from 'libs/store/actions';
import { generateContributor } from 'test/fakers/generateContributor';
import contributorsReducer from './contributors.reducer';

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
