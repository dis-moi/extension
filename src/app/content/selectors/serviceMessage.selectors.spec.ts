/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  getShowUpdateMessage,
  StateWithServiceMessage
} from './serviceMessage.selectors';

describe('content > selectors > serviceMessage', () => {
  describe('showUpdateMessage', () => {
    it('returns false if showUpdateMessage is false', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          showUpdateMessage: false
        }
      };
      expect(getShowUpdateMessage(state)).to.be.false;
    });
    it('returns true if showUpdateMessage is true', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          showUpdateMessage: true
        }
      };
      expect(getShowUpdateMessage(state)).to.be.true;
    });
  });
});
