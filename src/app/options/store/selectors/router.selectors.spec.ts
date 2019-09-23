/* eslint-disable no-unused-expressions */
import { Location } from 'history';
import { expect } from 'chai';
import { getCurrentScreen } from './router.selectors';
import { RouterRootState } from 'connected-react-router';

const basicLocationProps: Location = {
  pathname: '',
  hash: '',
  search: '',
  state: undefined
};

describe('options > selectors > router', () => {
  it('returns `subscriptions` if on `/settings/subscriptions`', () => {
    const state: RouterRootState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/settings/subscriptions'
        }
      }
    };
    expect(getCurrentScreen(state)).to.equal('subscriptions');
  });

  it('returns `suggestions` if on `/settings/suggestions`', () => {
    const state: RouterRootState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/settings/suggestions'
        }
      }
    };
    expect(getCurrentScreen(state)).to.equal('suggestions');
  });

  it('returns null if on any other route', () => {
    const state: RouterRootState = {
      router: {
        action: 'POP',
        location: {
          ...basicLocationProps,
          pathname: '/other-route'
        }
      }
    };
    expect(getCurrentScreen(state)).to.be.null;
  });
});
