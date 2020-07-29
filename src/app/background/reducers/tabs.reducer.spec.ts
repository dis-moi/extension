/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import tabsReducer from './tabs.reducer';
import { navigatedToUrl } from '../../actions';

describe('background > reducers > tabs', () => {
  describe('when receiving NAVIGATED_TO_URL', () => {
    // @ts-ignore
    const state = tabsReducer(undefined, { type: 'UNKNOWN' });
    state['42'] = {
      id: 42,
      url: 'someUrl',
      ready: true
    };

    const tabUpdatedAction = {
      ...navigatedToUrl('urlChanged'),
      meta: {
        tab: {
          id: 42,
          url: 'urlChanged',
          newInfo: 'toKeep'
        }
      }
    };

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

    it('keeps existing tab info when receiving NAVIGATED_TO_URL', () => {
      expect(tabsReducer(state, tabUpdatedAction)).to.have.nested.property(
        '42.ready',
        true
      );
    });
  });
});
