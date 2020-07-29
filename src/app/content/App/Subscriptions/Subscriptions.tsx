import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import InteractiveAvatar from 'components/molecules/InteractiveAvatar';
import Illustration from './Illustration';
import Container from './Container';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';

const Subscription = styled.div`
  margin-bottom: 20px;
`;

const SubscriptionList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style-type: none;
`;

const SubscriptionListItem = styled.li`
  cursor: hand;

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

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? '(s)' : '');

const nbContributorsPerRow = 6;
const maxNbRows = 3;

export interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
  subscribedContributors: StatefulContributor[];
  onContributorClick: (contributor: Contributor) => void;
}

const Subscriptions = ({
  openSubscriptions,
  subscribedContributors,
  onContributorClick
}: SubscriptionsScreenProps) => {
  const handleContributorClicked = (contributor: Contributor) => () => {
    onContributorClick(contributor);
  };

  return (
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
                <InteractiveAvatar
                  onClick={handleContributorClicked(contributor)}
                  contributor={contributor}
                  size="small"
                />
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
            Vous ne suivez actuellement aucun(e) informateur(trice). <br />
            Pour le bon fonctionnement de l&apos;extension, abonnez-vous !
          </>
        )}
        {subscribedContributors.length > 0 && (
          <>
            Vous suivez <br />
            <strong>{subscribedContributors.length}</strong> informateur(trice)
            {pluralize(subscribedContributors.length)}.
          </>
        )}
      </SubscriptionInfo>

      <BackgroundButton onClick={openSubscriptions}>
        Gérer mes abonnements
      </BackgroundButton>
    </Container>
  );
};

export default Subscriptions;
