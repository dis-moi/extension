/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { StateWithServiceMessage } from '../store';
import { hasServiceMessage } from './serviceMessage.selectors';

describe('content > selectors > serviceMessage', () => {
  describe('serviceMessage', () => {
    it('returns false if there is no serviceMessage', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: []
        }
      };
      expect(hasServiceMessage(state)).to.be.false;
    });
    it('returns true if serviceMessage is true', () => {
      const state: StateWithServiceMessage = {
        serviceMessage: {
          messages: ["Hey I'm a service message."]
        }
      };
      expect(hasServiceMessage(state)).to.be.true;
    });
  });
});
