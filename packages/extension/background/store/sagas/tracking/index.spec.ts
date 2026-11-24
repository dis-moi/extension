import chai, { expect } from 'chai';
import { runSaga, stdChannel } from 'redux-saga';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PlausibleTracker from 'libs/tracking/plausible';
import {
  AppAction,
  browserActionClicked,
  locationChanged,
  noticeBadged,
  noticeDisplayed,
  noticesFound,
  subscribe,
  unfoldNotice,
  updateInstallationDetails,
} from 'libs/store/actions';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
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
  let state: unknown;

  beforeEach(() => {
    const tracker = new PlausibleTracker('extension.test');
    track = sinon.stub(tracker, 'track').resolves();
    const channel = stdChannel<AppAction>();
    dispatch = (action) => channel.put(action as AppAction);
    state = {};
    runSaga(
      { channel, dispatch, getState: () => state },
      trackingSaga(tracker),
    );
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

  it('describes a displayed notice by its id and contributor', () => {
    const notice = generateStatefulNotice();
    state = { resources: { notices: [notice] } };

    dispatch({ ...noticeDisplayed(notice.id), meta: { tab } });

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'notice_displayed',
      url: 'app://extension/sites/mail.example.org',
      props: { notice_id: notice.id, contributor: notice.contributor.name },
    });
  });

  it('still reports a notice that is no longer in the store', () => {
    state = { resources: { notices: [] } };

    dispatch({ ...unfoldNotice(7), meta: { tab } });

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'notice_unfolded',
      url: 'app://extension/sites/mail.example.org',
      props: { notice_id: 7, contributor: '' },
    });
  });

  it('reports the badge colour and the number of notices on the tab', () => {
    state = {
      resources: { notices: [] },
      tabs: { [tab.id]: { ...tab, notices: [7, 8] } },
      prefs: { readNotices: [7, 8] },
    };

    dispatch(noticeBadged(7, tab));

    expect(track).to.have.been.calledOnceWithExactly({
      name: 'notice_badged',
      url: 'app://extension/sites/mail.example.org',
      props: { notice_id: 7, color: 'grey', notices_count: 2 },
    });
  });

  it('reports a failing event as a warning instead of crashing', () => {
    state = {};

    dispatch({ ...noticeDisplayed(7), meta: { tab } });
    dispatch(browserActionClicked(tab));

    expect(track).to.have.been.calledOnce;
    expect(track.firstCall.firstArg.name).to.equal('browser_action_clicked');
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
