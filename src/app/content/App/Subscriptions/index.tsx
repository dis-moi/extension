import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import withTitle from 'app/hocs/withTitle';
import Illustration from './Illustration';
import Container from './Container';
import withConnect from './withConnect';
import { compose } from 'redux';

interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
}

const SubscriptionInfo = styled.div`
  margin-bottom: 35px;
  font-size: 18px;
`;

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? 's' : '');

export const Subscriptions = ({
  openSubscriptions,
  nbSubscribedContributors
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionInfo>
      Vous êtes abonné(e)s à <strong>{nbSubscribedContributors}</strong>{' '}
      contributeur(ice){pluralize(nbSubscribedContributors)}.
    </SubscriptionInfo>

    <BackgroundButton onClick={openSubscriptions}>
      Gérer mes abonnements
    </BackgroundButton>
  </Container>
);

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('Abonnements')
)(Subscriptions);
