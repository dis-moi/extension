import React from 'react';
import { Notification } from '../organisms';
import Subscriptions from '../atoms/icons/illustrations/Subscriptions';
import { Container, SubscriptionsData } from '../atoms/Subscriptions';
import { BorderButton, CenterContainer } from '../atoms';

export default () => (
  <Notification title="Abonnements">
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
