/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  hasServiceMessage,
  StateWithServiceMessage
} from './serviceMessage.selectors';

describe('content > selectors > serviceMessage', () => {
  describe('serviceMessage', () => {
    it('returns false if there is no serviceMessage', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: [],
          action: null
        }
      };
      expect(hasServiceMessage(state)).to.be.false;
    });
    it('returns true if serviceMessage is true', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: ["Hey I'm a service message."],
          action: null
        }
      };
      expect(hasServiceMessage(state)).to.be.true;
    });
  });
});
