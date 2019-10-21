import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

import Illustration from './Illustration';
import Container from './Container';
import Avatar from '../../../../components/molecules/Avatar/Avatar';
import { StatefulContributor } from '../../../lmem/contributor';

export interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
  subscribedContributors: StatefulContributor[];
}

const Subscription = styled.div`
  margin-bottom: 20px;
`;

const SubscriptionList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style-type: none;
`;

const SubscriptionListItem = styled.li`
  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const SeeSubscriptions = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  line-height: 1;
  font-weight: bold;
  background-color: ${props => props.theme.contributorGrey};
  border: none;
  border-radius: 50%;
  cursor: pointer;
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
    <Subscription>
      {subscribedContributors.length === 0 && <Illustration />}
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
        <SubscriptionList key={`chunk${chunkIndex}`}>
          {contributorsChunk.map(contributor => (
            <SubscriptionListItem key={`contributor${contributor.id}`}>
              <Avatar contributor={contributor} size="small" />
            </SubscriptionListItem>
          ))}
          {chunkIndex === slicedSubscribedContributors.length - 1 && (
            <SubscriptionListItem>
              <SeeSubscriptions onClick={openSubscriptions} title="Voir tout">
                ...
              </SeeSubscriptions>
            </SubscriptionListItem>
          )}
        </SubscriptionList>
      ))}
    </Subscription>

    <SubscriptionInfo>
      {subscribedContributors.length === 0 && (
        <>
          Vous n&apos;êtes abonné·e·s à aucun·e contributeur·ice, c&apos;est
          nécessaire au bon fonctionnement de l&apos;extension.
        </>
      )}
      {subscribedContributors.length > 0 && (
        <>
          Vous êtes abonné(e)s à{' '}
          <strong>{subscribedContributors.length}</strong> contributeur(ice)
          {pluralize(subscribedContributors.length)}.
        </>
      )}
    </SubscriptionInfo>

    <BackgroundButton onClick={openSubscriptions}>
      Gérer mes abonnements
    </BackgroundButton>
  </Container>
);

export default Subscriptions;
