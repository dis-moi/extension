import chai from 'chai';
import { Action } from 'redux';
import reducer, { BackgroundState } from 'app/background/store/reducers';
import prefsReducer from 'app/background/store/reducers/prefs.reducer';
import {
  isOnboardingRequired,
  isInstallationComplete
} from 'app/background/store/selectors';
import { tosAccepted } from 'libs/store/actions';

import { ContributorId } from 'libs/domain/contributor';

const expect = chai.expect;

describe('background selectors', function() {
  describe('onboarding selectors', function() {
    const state: BackgroundState = {
      ...reducer(undefined, { type: 'anyAction' } as Action),
      subscriptions: [1, 42, 1024] as ContributorId[],
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
