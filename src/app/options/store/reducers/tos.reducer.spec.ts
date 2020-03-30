/* eslint-disable no-unused-expressions, @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { tosAccepted, transmitTosStatus } from 'app/actions';
import tosAcceptedReducer from './tos.reducer';

describe('options > reducers > tosAccepted', function() {
  // @ts-ignore
  const initialState = tosAcceptedReducer(undefined, { type: 'UNKNOWN' });

  it('is empty initially', () => {
    expect(initialState).to.eql({});
  });
  it('saves true on TOS_ACCEPTED', () => {
    expect(tosAcceptedReducer(initialState, tosAccepted({}))).to.be.eql({
      tosAccepted: true
    });
  });
  it('saves given value on TRANSMIT_TOS_STATUS', () => {
    expect(
      tosAcceptedReducer(initialState, transmitTosStatus(false))
    ).to.be.eql({ tosAccepted: false });
    expect(
      tosAcceptedReducer(initialState, transmitTosStatus(true))
    ).to.be.eql({ tosAccepted: true });
  });
});
