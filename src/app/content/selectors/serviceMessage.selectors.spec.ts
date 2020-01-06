/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { hasServiceMessage } from './serviceMessage.selectors';
import { StateWithServiceMessage } from '../store';

describe('content > selectors > serviceMessage', () => {
  describe('serviceMessage', () => {
    it('returns false if there is no serviceMessage', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: [],
          action: null,
          lastShownDate: null
        }
      };
      expect(hasServiceMessage(state)).to.be.false;
    });
    it('returns true if serviceMessage is true', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: ["Hey I'm a service message."],
          action: null,
          lastShownDate: null
        }
      };
      expect(hasServiceMessage(state)).to.be.true;
    });
  });
});
