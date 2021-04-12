import { Subscriptions } from '../lmem/subscription';
import {
  contextPopinInitState,
  PopinDisplayState
} from '../profiles/App/Pages/Profiles/ContextPopin';
import { StatefulContributor } from '../lmem/contributor';
import { MouseEvent } from 'react';
import i18n from 'i18next';

const onContributorExampleClick = (
  contributor: StatefulContributor,
  connected: boolean | undefined,
  subscriptions: Subscriptions | undefined,
  setPopin: (state: PopinDisplayState) => void,
  handleSubscribe: (contributor: StatefulContributor) => () => void,
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void
) => {
  if (!connected)
    return setPopin({
      opened: true,
      content: {
        text: i18n.t('profiles:popin.is_not_connected.message', {
          contributorName: contributor.name
        }),
        onClick: e => {
          addToBrowser(e);
          setPopin(contextPopinInitState);
        },
        btnLabel: i18n.t('profiles:popin.is_not_connected.btn_text')
      }
    });

  const isSubscriber =
    subscriptions && subscriptions.find((id: number) => id === contributor.id);
  const path = contributor.contribution?.example.exampleMatchingUrl;
  if (!path) return null;

  if (connected && !isSubscriber)
    return setPopin({
      opened: true,
      content: {
        text: i18n.t('profiles:popin.is_not_subscriber.message', {
          contributorName: contributor.name
        }),
        btnLabel: i18n.t('profiles:popin.is_not_subscriber.btn_text'),
        onClick: async () => {
          handleSubscribe(contributor);
          setPopin({
            opened: true,
            content: {
              text: i18n.t('profiles:popin.just_subscribed.message', {
                contributorName: contributor.name
              })
            }
          });
          window.open(path, '_blank');
        }
      }
    });
  if (connected && isSubscriber) return window.open(path, '_blank');
};
export default onContributorExampleClick;
