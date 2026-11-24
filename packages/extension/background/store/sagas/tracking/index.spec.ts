import chai, { expect } from 'chai';
import { runSaga, stdChannel } from 'redux-saga';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PlausibleTracker from 'libs/tracking/plausible';
import {
  AppAction,
  browserActionClicked,
  locationChanged,
  noticesFound,
  subscribe,
  updateInstallationDetails,
} from 'libs/store/actions';
import { LOCATION_CHANGE } from 'libs/store/router';
import { ContributorId } from '@dismoi/domain/contributor';
import { InstallationDetails } from '@dismoi/domain/installation';
import trackingSaga from '.';

chai.use(sinonChai);

const PRIVATE_PAGE = 'https://mail.example.org/messages/id/0053c159?token=s';
const tab = { id: 1, url: PRIVATE_PAGE };

const routeChangedTo = (pathname: string) => ({
  ...locationChanged({
    type: LOCATION_CHANGE,
    payload: {
      location: { pathname, search: '', hash: '', state: undefined },
      action: 'PUSH',
      isFirstRendering: false,
    },
  }),
  meta: { tab },
});

describe('tracking saga', () => {
  let track: sinon.SinonStub;
  let dispatch: (action: unknown) => void;

  beforeEach(() => {
    const tracker = new PlausibleTracker('extension.test');
    track = sinon.stub(tracker, 'track').resolves();
    const channel = stdChannel<AppAction>();
    dispatch = (action) => channel.put(action as AppAction);
    runSaga({ channel, dispatch, getState: () => ({}) }, trackingSaga(tracker));
  });

  it('reports the extension screen as a page view, not the visited page', () => {
    dispatch(routeChangedTo('/account/filters'));

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'pageview',
      url: 'app://extension/account/filters',
    });
  });

  it('does not report the redirecting root route', () => {
    dispatch(routeChangedTo('/'));

    expect(track).not.to.have.been.called;
  });

  it('reports found notices as an event on the site domain', () => {
    dispatch(noticesFound([], tab));

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'notices_found',
      url: 'app://extension/sites/mail.example.org',
      props: { notices_count: 0 },
    });
  });

  it('never sends the path of the visited page', () => {
    dispatch(browserActionClicked(tab));
    dispatch(subscribe(42 as ContributorId, { tab }));

    track.getCalls().forEach(({ firstArg }) => {
      expect(firstArg.url).to.equal('app://extension/sites/mail.example.org');
    });
    expect(track).to.have.been.calledTwice;
  });

  it('reports events raised outside a web page on the internal page', () => {
    dispatch(
      updateInstallationDetails({
        reason: 'install',
        version: '1.0.0',
      } as InstallationDetails),
    );

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'install',
      url: 'app://extension/internal',
      props: { reason: 'install', version: '1.0.0' },
    });
  });
});
