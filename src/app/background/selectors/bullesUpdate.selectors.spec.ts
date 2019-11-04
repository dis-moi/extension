import { expect } from 'chai';
import { getUpdateMessageLastShowDate } from './bullesUpdate.selectors';
import { BullesUpdateStateSlice } from '../reducers/bullesUpdate.reducer';

describe('background > selectors > bullesUpdate', () => {
  describe('getUpdateMessageLastShowDate', () => {
    it("returns the message's last date", () => {
      const someDay = new Date('2019-09-13');
      const state: BullesUpdateStateSlice = {
        bullesUpdate: { lastUpdateMessageShowDate: someDay }
      };
      expect(getUpdateMessageLastShowDate(state)).to.eql(someDay);
    });
  });
});
