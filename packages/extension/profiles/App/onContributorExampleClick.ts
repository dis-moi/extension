import { MouseEvent } from 'react';
import { TFunction } from 'i18next';
import { Subscriptions } from '@dismoi/domain/subscription';

import { StatefulContributor } from '@dismoi/domain/contributor';
import { installExtension } from 'libs/webext/extensionDetectionAndInstall';
import {
  ContextPopinState,
  initialState as popinInitialState,
} from 'app/profiles/store/reducers/contextPopin.reducer';

type HandleSubscribe = (contributor: StatefulContributor) => () => void;

/**
 * La traduction est celle du composant appelant, qui la tient du fournisseur
 * React. Le singleton global d'i18next, lu ici auparavant, n'est plus
 * initialisé depuis que le site crée une instance par rendu : `t()` rendait
 * `undefined` et la popin s'ouvrait sans un mot.
 */
const onContributorExampleClick = (
  contributor: StatefulContributor,
  connected: boolean | undefined,
  subscriptions: Subscriptions | undefined,
  handleSubscribe: HandleSubscribe,
  setPopin: (payload: ContextPopinState) => void,
  t: TFunction,
) => {
  if (!connected) {
    const isNotConnectedPopin: ContextPopinState = {
      opened: true,
      content: {
        text: t('profiles:popin.is_not_connected.message', {
          contributorName: contributor.name,
        }),
        btn: {
          onClick: (e?: MouseEvent<HTMLButtonElement>) => {
            e?.preventDefault();
            installExtension().then(() => {
              setPopin(popinInitialState);
            });
          },
          label: t('profiles:popin.is_not_connected.btn_text'),
        },
      },
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
        text: t('profiles:popin.just_subscribed.message', {
          contributorName: contributor.name,
        }),
        btn: {
          label: t('profiles:popin.just_subscribed.btn_text'),
          onClick: () => {
            window.open(path, '_blank');
            setPopin(popinInitialState);
          },
        },
      },
    };
    const isNotSubcriberPopin: ContextPopinState = {
      opened: true,
      content: {
        text: t('profiles:popin.is_not_subscriber.message', {
          contributorName: contributor.name,
        }),
        btn: {
          label: t('profiles:popin.is_not_subscriber.btn_text'),
          onClick: () => {
            handleSubscribe(contributor)();
            setPopin(afterSubscribePopin);
          },
        },
      },
    };
    return setPopin(isNotSubcriberPopin);
  }
  if (connected && isSubscriber) return window.open(path, '_blank');
};
export default onContributorExampleClick;
