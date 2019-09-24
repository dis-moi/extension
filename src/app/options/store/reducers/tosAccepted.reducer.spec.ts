/* eslint-disable no-unused-expressions, @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { tosAccepted, transmitTosStatus } from 'app/actions';
import tosAcceptedReducer from './tosAccepted.reducer';

describe('options > reducers > tosAccepted', function() {
  // @ts-ignore
  const initialState = tosAcceptedReducer(undefined, { type: 'UNKNOWN' });

  it('is false initially', () => {
    expect(initialState).to.be.false;
  });
  it('saves true on TOS_ACCEPTED', () => {
    expect(tosAcceptedReducer(initialState, tosAccepted({}))).to.be.true;
  });
  it('saves given value on TRANSMIT_TOS_STATUS', () => {
    expect(tosAcceptedReducer(initialState, transmitTosStatus(false))).to.be
      .false;
    expect(tosAcceptedReducer(initialState, transmitTosStatus(true))).to.be
      .true;
  });
});
