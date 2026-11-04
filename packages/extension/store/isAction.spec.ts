import { expect } from 'chai';
import isAction from './isAction';

describe('isAction', () => {
  it('return true if the action got a type', () => {
    expect(isAction({ type: 'UNKNOWN' })).to.equal(true);
  });
  it('return false for an empty object', () => {
    expect(isAction({})).to.equal(false);
  });
});
