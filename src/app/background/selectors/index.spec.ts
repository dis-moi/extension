import chai from 'chai';
import reducer, { BackgroundState } from 'app/background/reducers';
import prefsReducer from 'app/background/reducers/prefs.reducer';
import { isOnboardingRequired } from 'app/background/selectors';
import { isInstallationComplete } from './index';
import { tosAccepted } from '../../actions';

const expect = chai.expect;

describe('background selectors', function() {
  describe('onboarding selectors', function() {
    const state: BackgroundState = {
      ...reducer(undefined, { type: 'anyAction' }),
      subscriptions: [1, 42, 1024],
      prefs: prefsReducer(undefined, tosAccepted({}))
    };

    describe('isInstallationComplete', function() {
      it('can tell if the installation is complete whatever the install reason was', () => {
        expect(isInstallationComplete(state)).equals(true);
      });
    });

    describe('isOnboardingRequired', function() {
      it('should return false when the user has accepted TOS', () => {
        expect(isOnboardingRequired(state)).equals(false);
      });
    });
  });
});
