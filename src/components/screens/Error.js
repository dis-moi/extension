import React from 'react';
import { Container, ContentTitle, Content } from '../atoms/Error';
import { BorderButton } from '../atoms';
import { Error } from '../atoms/icons/illustrations';
import { Notification } from '../organisms';

export default ({ location }) => (
  <Notification>
    <Container>
      <Error />
      <ContentTitle>
        Oops !
      </ContentTitle>
      <Content>
        Quelque chose s’est mal passé. Veuillez actualiser le plugin ou réessayer plus tard.
      </Content>
      <BorderButton>Actualiser</BorderButton>
    </Container>
  </Notification>
);
