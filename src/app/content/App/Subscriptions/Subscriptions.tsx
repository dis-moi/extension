import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

import Container from './Container';
import Avatar from '../../../../components/molecules/Avatar/Avatar';
import { StatefulContributor } from '../../../lmem/contributor';

export interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
  subscribedContributors: StatefulContributor[];
}

const SubscriptionList = styled.div`
  margin-bottom: 20px;

  ul {
    display: flex;
    list-style-type: none;
  }

  li:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const SubscriptionInfo = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
`;

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? 's' : '');

const nbContributorsPerRow = 6;
const maxNbRows = 3;

const Subscriptions = ({
  openSubscriptions,
  subscribedContributors
}: SubscriptionsScreenProps) => (
  <Container>
    <SubscriptionList>
      {R.splitEvery(
          nbContributorsPerRow,
          subscribedContributors
            .slice(0, nbContributorsPerRow * maxNbRows)
            .filter(
              (contributor, i, slicedSubscribedContributors) =>
                !(
                  slicedSubscribedContributors.length % nbContributorsPerRow ===
                    0 && i === slicedSubscribedContributors.length - 1
                )
            )
        ).map((contributorsChunk, chunkIndex, slicedSubscribedContributors) => (
            <ul key={`chunk${chunkIndex}`}>
            {contributorsChunk.map(contributor => (
                <li key={`contributor${contributor.id}`}>
                    <Avatar contributor={contributor} size="small" />
                </li>
            ))}
            {chunkIndex === slicedSubscribedContributors.length - 1 && (
              <li>
                <button onClick={openSubscriptions}>...</button>
              </li>
            )}
          </ul>
        ))}
      </SubscriptionList>

      <SubscriptionInfo>
          Vous êtes abonné(e)s à <strong>{subscribedContributors.length}</strong>{' '}
          contributeur(ice){pluralize(subscribedContributors.length)}.
      </SubscriptionInfo>

      <BackgroundButton onClick={openSubscriptions}>
          Gérer mes abonnements
      </BackgroundButton>
  </Container>
);

export default Subscriptions;
