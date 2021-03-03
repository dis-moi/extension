import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import InteractiveAvatar from 'components/molecules/InteractiveAvatar';
import ContributorListItem from 'components/atoms/ContributorListItem';
import Illustration from './Illustration';
import Container from './Container';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import { Trans, useTranslation } from 'react-i18next';

const Subscription = styled.div`
  margin-bottom: 20px;
`;

const SubscriptionList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style-type: none;
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

  const { t } = useTranslation();

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
              <ContributorListItem key={`contributor${contributor.id}`}>
                <InteractiveAvatar
                  onClick={handleContributorClicked(contributor)}
                  contributor={contributor}
                  size="small"
                />
              </ContributorListItem>
            ))}
            {chunkIndex === slicedSubscribedContributors.length - 1 && (
              <ContributorListItem>
                <SeeSubscriptions
                  onClick={openSubscriptions}
                  title={t('action.see_more')}
                >
                  ...
                </SeeSubscriptions>
              </ContributorListItem>
            )}
          </SubscriptionList>
        ))}
      </Subscription>

      <SubscriptionInfo>
        {subscribedContributors.length === 0 && (
          <Trans i18nKey={'subscriptions.no_followed_sources'} />
        )}
        {subscribedContributors.length > 0 && (
          <Trans
            i18nKey={'subscriptions.followed_sources'}
            count={subscribedContributors.length}
          />
        )}
      </SubscriptionInfo>
      <BackgroundButton onClick={openSubscriptions}>
        <Trans i18nKey={'subscriptions.manage_subscription'} />
      </BackgroundButton>
    </Container>
  );
};

export default Subscriptions;
