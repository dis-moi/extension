import { expect } from 'chai';
import { ServiceMessageStateSlice } from '../reducers/serviceMessage.reducer';
import { getServiceMessageLastShowDate } from './serviceMessage.selectors';

describe('background > selectors > serviceMessage', () => {
  describe('getServiceMessageLastShowDate', () => {
    it("returns the message's last date", () => {
      const someDay = new Date('2019-09-13');
      const state: ServiceMessageStateSlice = {
        serviceMessage: { lastShownDate: someDay }
      };
      expect(getServiceMessageLastShowDate(state)).to.eql(someDay);
    });
  });
});
