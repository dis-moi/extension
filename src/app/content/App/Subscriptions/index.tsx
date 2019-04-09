import React from 'react';
import Notification from 'components/organisms/Notification';
import BorderButton from 'components/atoms/Buttons/BorderButton/BorderButton';
import Illustration from './Illustration';
import Container from './Container';
import SubscriptionsData from './SubscriptionsData';

interface Props {
  close?: () => void;
}
export default ({ close }: Props) => (
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
