import chai from 'chai';
import reducer from 'app/background/reducers';
import { updateInstallationDetails } from 'app/actions/install';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { version } from '../../../package.json';

const expect = chai.expect;

describe('background selectors', function() {
  describe('isAnUpdateFromLmem', function() {
    it("can tell if it's not an update from LMEM", () => {
      const action = updateInstallationDetails({
        reason: 'install',
        version
      });
      const nextState = reducer(undefined, action);

      expect(isAnUpdateFromLmem(nextState)).equals(false);
    });

    it("can tell if it's an update from LMEM", () => {
      const action = updateInstallationDetails({
        reason: 'update',
        previousVersion: '0.1.0',
        version
      });
      const nextState = reducer(undefined, action);

      expect(isAnUpdateFromLmem(nextState)).equals(true);
    });
  });
});
