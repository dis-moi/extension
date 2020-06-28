import { expect } from 'chai';
import isStandardAction from './isStandardAction';

describe('isAction', () => {
  it('return false if the action got an extra prop', () => {
    expect(isStandardAction({ type: 'webpackOk', data: undefined })).to.equal(
      false
    );
  });
  it('return true for a fully features standard action', () => {
    expect(
      isStandardAction({ type: 'Hello', payload: 'world', meta: '!' })
    ).to.equal(true);
  });

  it('return true for an error action', () => {
    expect(
      isStandardAction({
        type: 'ERROR',
        payload: new Error('Smthing came up...'),
        error: true,
        meta: 'somewhere'
      })
    ).to.equal(true);
  });
});
