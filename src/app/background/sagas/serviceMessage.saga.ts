import { put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { open, OpenFrom, showServiceMessage } from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import Tab from 'app/lmem/tab';
import { getServiceMessageLastShowDate } from '../selectors/serviceMessage.selectors';
import { LinkType } from 'app/lmem/ServiceMessage';
import { isWithinLastHours } from 'app/utils/areWithinHours';
import { Level } from '../../utils/Logger';
import { path } from '../../../routes';
import useChangeLanguage from '../../hooks/useChangeLanguage';

export const buildMessages = (messages: string[], nbNotices = 0): string[] => {
  const firstMessage =
    nbNotices > 0
      ? 'Il existe une contribution sur cette page. Pour la visualiser, veuillez finaliser votre configuration.'
      : 'Pour poster et recevoir des messages, veuillez finaliser votre configuration.';

  return R.prepend(firstMessage, messages);
};

export default function* serviceMessageSaga(tab: Tab, nbNotices = 0) {
  const lang = useChangeLanguage();
  try {
    const tosAccepted = yield select(areTosAccepted);
    const nbSubscriptions = yield select(getNbSubscriptions);
    const lastShownDate = yield select(getServiceMessageLastShowDate);

    if (tosAccepted && nbSubscriptions === 0) {
      yield put(
        showServiceMessage(
          {
            messages: buildMessages([], nbNotices),
            action: {
              label: 'Choisir mes sources',
              url: path[lang].CONTRIBUTORS,
              type: LinkType.Options
            }
          },
          tab
        )
      );
    }

    if (!isWithinLastHours(lastShownDate, 4) && nbNotices > 0) {
      yield put(open(OpenFrom.ServiceMessage, tab));
    }
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
}
