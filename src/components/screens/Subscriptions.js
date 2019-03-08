import React from 'react';
import { Notification } from '../organisms';
import Subscriptions from '../atoms/icons/illustrations/Subscriptions';
import { Container, SubscriptionsData } from '../atoms/Subscriptions';
import { BorderButton } from '../atoms';

export default ({ close }) => (
  <Notification title="Abonnements" close={close}>
    <Container>
      <Subscriptions />

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

      <BorderButton>Gérer</BorderButton>
    </Container>
  </Notification>
);
