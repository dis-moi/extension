import React from 'react';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import withTitle from 'app/hocs/withTitle';
import Illustration from './Illustration';
import Container from './Container';
import SubscriptionsData from './SubscriptionsData';
import withConnect from './withConnect';
import { compose } from 'redux';

interface SubscriptionsScreenProps {
  optionsRequested: () => void;
}

export const Subscriptions = ({
  optionsRequested
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionsData>
      <div>
        <span>5</span>
        <span>Abonnements</span>
      </div>
    </SubscriptionsData>

    <BorderButton onClick={optionsRequested}>Gérer</BorderButton>
  </Container>
);

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('Abonnements')
)(Subscriptions);
