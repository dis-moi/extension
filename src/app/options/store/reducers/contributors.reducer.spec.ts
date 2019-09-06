/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import contributorsReducer from './contributors.reducer';
import {
  contributorsTransmitted,
  ContributorsTransmittedAction
} from '../../../actions';
import { generateContributor } from 'test/fakers/generateContributor';

describe('options > reducers > contributors', function() {
  it('is empty initially', () => {
    expect(contributorsReducer(undefined, { type: 'CLOSED' })).to.be.empty;
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
