import React, { useEffect } from 'react';
import BorderButton from 'components/atoms/Buttons/BorderButton/BorderButton';
import Illustration from './Illustration';
import Container from './Container';
import SubscriptionsData from './SubscriptionsData';
import ScreenProps, { useUITitleEffect } from '../../ScreenProps';
import withConnect from './withConnect';

interface SubscriptionsScreenProps extends ScreenProps {}

export const Subscriptions = (props: SubscriptionsScreenProps) => {
  useUITitleEffect(props)('Abonnements');

  return (
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
  );
};

export default withConnect(Subscriptions);
