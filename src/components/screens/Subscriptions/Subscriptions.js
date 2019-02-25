import React from 'react';
import { Notification } from '../../organisms';
import Illustration from './Illustration';
import Container from './Container';
import SubscriptionsData from './SubscriptionsData';
import BorderButton from '../../atoms/Buttons/BorderButton/BorderButton';

export default ({ close }) => (
  <Notification title="Abonnements" close={close}>
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

      <BorderButton>Gérer</BorderButton>
    </Container>
  </Notification>
);
