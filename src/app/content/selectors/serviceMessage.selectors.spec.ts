/* eslint-disable @typescript-eslint/ban-ts-ignore, no-unused-expressions */
import { expect } from 'chai';
import { getShowUpdateMessage } from './serviceMessage.selectors';
import { ContentState } from '../store';

const getState = (withShowUpdateMessage: boolean): ContentState => ({
  ui: { mounted: false, open: false, title: '' },
  tab: { id: 1, url: 'url' },
  router: {
    location: { pathname: '', search: '', state: {}, hash: '' },
    action: 'REPLACE'
  },
  notices: [],
  installationDetails: {
    version: '1',
    datetime: new Date(),
    reason: 'install'
  },
  form: {},
  serviceMessage: {
    showUpdateMessage: withShowUpdateMessage
  }
});

describe('content > selectors > serviceMessage', () => {
  describe('showUpdateMessage', () => {
    it('returns current showUpdateMessage status', () => {
      // @ts-ignore
      expect(getShowUpdateMessage(getState(false), { TYPE: 'UNEXPECTED' })).to
        .be.false;
      // @ts-ignore
      expect(getShowUpdateMessage(getState(true), { TYPE: 'UNEXPECTED' })).to.be
        .true;
    });
  });
});
