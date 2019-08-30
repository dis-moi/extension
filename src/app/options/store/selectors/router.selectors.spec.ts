/* eslint-disable no-unused-expressions */
import { Location } from 'history';
import { expect } from 'chai';
import { getCurrentScreen } from './router.selectors';
import { OptionsState } from '../reducers';

const basicLocationProps: Location = {
  pathname: '',
  hash: '',
  search: '',
  state: undefined
};

describe('options > selectors > router', () => {
  it('returns `subscriptions` if on `/subscriptions`', () => {
    const state: OptionsState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/subscriptions'
        }
      },
      contributors: []
    };
    expect(getCurrentScreen(state)).to.equal('subscriptions');
  });

  it('returns `suggestions` if on `/suggestions`', () => {
    const state: OptionsState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/suggestions'
        }
      },
      contributors: []
    };
    expect(getCurrentScreen(state)).to.equal('suggestions');
  });

  it('returns null if on any other route', () => {
    const state: OptionsState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/other-route'
        }
      },
      contributors: []
    };
    expect(getCurrentScreen(state)).to.be.null;
  });
});
