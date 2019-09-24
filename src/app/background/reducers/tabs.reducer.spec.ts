/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import tabsReducer from './tabs.reducer';
import { tabUpdated } from '../../actions';

describe('background > reducers > tabs', () => {
  describe('when receiving TAB_UPDATED', () => {
    // @ts-ignore
    const state = tabsReducer(undefined, { type: 'UNKNOWN' });
    state['42'] = {
      id: 42,
      url: 'someUrl',
      ready: true,
      options: true
    };

    const tabUpdatedAction = tabUpdated({
      id: 42,
      url: 'urlChanged',
      // @ts-ignore
      newInfo: 'toKeep'
    });

    it('saves new or updated tab info', () => {
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.id',
        42
      );
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.url',
        'urlChanged'
      );
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.newInfo',
        'toKeep'
      );
    });

    it('keeps existing tab info when receiving TAB_UPDATED', () => {
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.ready',
        true
      );
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.options',
        true
      );
    });
  });
});
