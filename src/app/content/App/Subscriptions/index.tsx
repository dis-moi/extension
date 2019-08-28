import React from 'react';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import withTitle from 'app/hocs/withTitle';
import Illustration from './Illustration';
import Container from './Container';
import SubscriptionsData from './SubscriptionsData';
import withConnect from './withConnect';
import { compose } from 'redux';

interface SubscriptionsScreenProps {
  settingsRequested: () => void;
}

export const Subscriptions = ({
  settingsRequested
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionsData>
      <div>
        <span>5</span>
        <span>Abonnements</span>
      </div>
      <div>
        <span>3</span>
        <span>
          Notices
          <br />
          publiées
        </span>
      </div>
      <div>
        <span>155</span>
        <span>Vues</span>
      </div>
    </SubscriptionsData>

    <BorderButton onClick={settingsRequested}>Gérer</BorderButton>
  </Container>
);

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('Abonnement')
)(Subscriptions);
