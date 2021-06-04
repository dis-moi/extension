import { MouseEvent } from 'react';
import i18n from 'i18next';
import { Subscriptions } from 'libs/domain/subscription';

import { StatefulContributor } from 'libs/domain/contributor';
import {
  ContextPopinState,
  initialState as popinInitialState
} from 'app/profiles/store/reducers/contextPopin.reducer';

type HandleSubscribe = (contributor: StatefulContributor) => () => void;
type AddToBrowser = (e: MouseEvent<HTMLButtonElement>) => void;

const onContributorExampleClick = (
  contributor: StatefulContributor,
  connected: boolean | undefined,
  subscriptions: Subscriptions | undefined,
  handleSubscribe: HandleSubscribe,
  addToBrowser: AddToBrowser,
  setPopin: (payload: ContextPopinState) => void
) => {
  if (!connected) {
    const isNotConnectedPopin: ContextPopinState = {
      opened: true,
      content: {
        text: i18n.t('profiles:popin.is_not_connected.message', {
          contributorName: contributor.name
        }),
        btn: {
          onClick: (e?: MouseEvent<HTMLButtonElement>) => {
            addToBrowser(e as MouseEvent<HTMLButtonElement>);
            setPopin(popinInitialState);
          },
          label: i18n.t('profiles:popin.is_not_connected.btn_text')
        }
      }
    };
    return setPopin(isNotConnectedPopin);
  }

  const isSubscriber =
    subscriptions && subscriptions.find((id: number) => id === contributor.id);
  const path = contributor.contribution?.example.exampleMatchingUrl;
  if (!path) return null;

  if (connected && !isSubscriber) {
    const afterSubscribePopin: ContextPopinState = {
      opened: true,
      content: {
        text: i18n.t('profiles:popin.just_subscribed.message', {
          contributorName: contributor.name
        }),
        btn: {
          label: i18n.t('profiles:popin.just_subscribed.btn_text'),
          onClick: () => {
            window.open(path, '_blank');
            setPopin(popinInitialState);
          }
        }
      }
    };
    const isNotSubcriberPopin: ContextPopinState = {
      opened: true,
      content: {
        text: i18n.t('profiles:popin.is_not_subscriber.message', {
          contributorName: contributor.name
        }),
        btn: {
          label: i18n.t('profiles:popin.is_not_subscriber.btn_text'),
          onClick: () => {
            handleSubscribe(contributor)();
            setPopin(afterSubscribePopin);
          }
        }
      }
    };
    return setPopin(isNotSubcriberPopin);
  }
  if (connected && isSubscriber) return window.open(path, '_blank');
};
export default onContributorExampleClick;
