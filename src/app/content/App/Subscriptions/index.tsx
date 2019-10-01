import React from 'react';
import styled from 'styled-components';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import withTitle from 'app/hocs/withTitle';
import Illustration from './Illustration';
import Container from './Container';
import withConnect from './withConnect';
import { compose } from 'redux';

interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbTotalContributors?: number;
  nbSubscribedContributors?: number;
}

const SubscriptionInfo = styled.div`
  margin-bottom: 35px;
  font-size: 18px;
`;

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? 's' : '');

export const Subscriptions = ({
  openSubscriptions,
  nbSubscribedContributors,
  nbTotalContributors
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionInfo>
      Votre extension est abonnée à <strong>{nbSubscribedContributors}</strong>{' '}
      contributeur{pluralize(nbSubscribedContributors)} sur{' '}
      <strong>{nbTotalContributors}</strong> possibles.
    </SubscriptionInfo>

    <BorderButton onClick={openSubscriptions}>Gérer</BorderButton>
  </Container>
);

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('Abonnements')
)(Subscriptions);
