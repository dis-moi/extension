import chai from 'chai';
import { Action } from 'redux';
import reducer, { BackgroundState } from 'apps/background/src/store/reducers';
import prefsReducer from 'apps/background/src/store/reducers/prefs.reducer';
import { isOnboardingRequired } from 'apps/background/src/store/selectors/index';
import { tosAccepted } from '../../../../../libs/store/actions';
import { isInstallationComplete } from './index';

const expect = chai.expect;

describe('background selectors', function() {
  describe('onboarding selectors', function() {
    const state: BackgroundState = {
      ...reducer(undefined, { type: 'anyAction' } as Action),
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
