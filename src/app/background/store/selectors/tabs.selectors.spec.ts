import { expect } from 'chai';
import { TabsState } from 'app/background/store/reducers/tabs.reducer';
import { getOptionsTabs, getReadyTabs, getTabsList } from './tabs';

interface StateWithTabs {
  tabs: TabsState;
}

describe('background > selectors > tabs', () => {
  const state: StateWithTabs = {
    tabs: {
      '1': { id: 1, url: 'someUrl', ready: true },
      '2': { id: 2, url: 'someOtherUrl' },
      '3': { id: 3, url: 'optionsUrl', options: true, ready: true }
    }
  };

  describe('getTabsList', () => {
    it('returns all known tabs an an array', () => {
      expect(getTabsList(state)).to.eql([
        { id: 1, url: 'someUrl', ready: true },
        { id: 2, url: 'someOtherUrl' },
        { id: 3, url: 'optionsUrl', options: true, ready: true }
      ]);
    });
  });
  describe('getReadyTabs', () => {
    it('returns all tabs that are marked ready', () => {
      expect(getReadyTabs(state)).to.eql([
        { id: 1, url: 'someUrl', ready: true },
        { id: 3, url: 'optionsUrl', options: true, ready: true }
      ]);
    });
  });
  describe('getOptionsTabs', () => {
    it('returns all options tabs', () => {
      expect(getOptionsTabs(state)).to.eql([
        { id: 3, url: 'optionsUrl', options: true, ready: true }
      ]);
    });
  });
});
