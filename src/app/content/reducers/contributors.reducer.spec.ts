/* eslint-disable @typescript-eslint/ban-ts-ignore, no-unused-expressions */
import { expect } from 'chai';
import contributors from './contributors.reducer';
import { contributorsTransmitted } from '../../actions';

describe('content > reducers > contributors', () => {
  // @ts-ignore
  const initialState = contributors(undefined, { type: 'UNKNOWN' });

  it('initialize to empty object', () => {
    expect(initialState).to.be.empty;
  });
  describe('when given CONTRIBUTORS_TRANSMITTED', () => {
    const contributorsAction = contributorsTransmitted([
      { id: 1, name: 'John Doe', contributions: 25 },
      {
        id: 2,
        name: 'Johnnie Walker',
        contributions: 12,
        subscribed: true
      },
      {
        id: 3,
        name: 'Louis Armstrong',
        contributions: 42,
        subscribed: true
      }
    ]);

    const newState = contributors(initialState, contributorsAction);

    it('saves the number of total contributors', () => {
      expect(newState).to.have.property('total', 3);
    });
    it('saves the number of subscribed contributors', () => {
      expect(newState).to.have.property('subscribed', 2);
    });
  });
});
