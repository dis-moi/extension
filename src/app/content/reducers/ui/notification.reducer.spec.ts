/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import openReducer from './notification.reducer';
import { closed, opened } from '../../../actions';
import * as R from 'ramda';
import { CloseCause } from '../../../lmem/ui';
import { endLoading } from '../../actions/ui/open.actions';

interface StateOptions {
  mounted?: boolean;
  open?: boolean;
  loaded?: boolean;
}
const getStateWith = ({ open, mounted, loaded }: StateOptions = {}) => ({
  open: R.defaultTo(false, open),
  mounted: R.defaultTo(false, mounted),
  loaded: R.defaultTo(false, loaded)
});

describe('content > reducers > openReducer', () => {
  it('has initial state all false', () => {
    // @ts-ignore
    expect(openReducer(undefined, { type: 'UNKNOWN' })).to.eql({
      open: false,
      mounted: false,
      loaded: false
    });
  });
  describe('mounted state', () => {
    it('becomes true when OPENED', () => {
      expect(
        openReducer(getStateWith({ mounted: false }), opened())
      ).to.have.property('mounted', true);
    });
    it('stays true on CLOSED', () => {
      expect(
        openReducer(
          getStateWith({ mounted: true }),
          closed(CloseCause.CloseButton)
        )
      ).to.have.property('mounted', true);
    });
  });
  describe('open state', () => {
    it('becomes true when OPENED', () => {
      expect(
        openReducer(getStateWith({ open: false }), opened())
      ).to.have.property('open', true);
    });
    it('becomes false when CLOSED', () => {
      expect(
        openReducer(
          getStateWith({ open: true }),
          closed(CloseCause.CloseButton)
        )
      ).to.have.property('open', false);
    });
  });
  describe('loaded state', () => {
    it('stays false when OPENED', () => {
      expect(
        openReducer(getStateWith({ loaded: false }), opened())
      ).to.have.property('loaded', false);
    });
    it('becomes true when END_LOADING', () => {
      expect(
        openReducer(getStateWith({ loaded: false, open: true }), endLoading())
      ).to.have.property('loaded', true);
    });
    it('becomes false when CLOSED', () => {
      expect(
        openReducer(
          getStateWith({ loaded: true }),
          closed(CloseCause.CloseButton)
        )
      ).to.have.property('loaded', false);
    });
    it('stays false END_LOADING but already closed', () => {
      expect(
        openReducer(getStateWith({ loaded: false, open: false }), endLoading())
      ).to.have.property('loaded', false);
    });
  });
});
