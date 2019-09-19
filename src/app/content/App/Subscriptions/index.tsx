import React from 'react';
import styled from 'styled-components';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import withTitle from 'app/hocs/withTitle';
import Illustration from './Illustration';
import Container from './Container';
import withConnect from './withConnect';
import { compose } from 'redux';

interface SubscriptionsScreenProps {
  optionsRequested: () => void;
}

const SubscriptionInfo = styled.div`
  margin-bottom: 35px;
  font-size: 18px;
`;

export const Subscriptions = ({
  optionsRequested
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionInfo>
      Votre extension est abonnée à <strong>8</strong> contributeurs sur{' '}
      <strong>18</strong> possibles.
    </SubscriptionInfo>

    <BorderButton onClick={optionsRequested}>Gérer</BorderButton>
  </Container>
);

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('Abonnements')
)(Subscriptions);
