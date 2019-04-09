import React from 'react';
import Notification from 'components/organisms/Notification';
import Illustration from './Illustration';
import Container from './Container';
import withConnect from './withConnect';

export const Loading = ({ close }) => (
  <Notification close={close}>
    <Container>
      <Illustration />
      Chargement…
    </Container>
  </Notification>
);

export default withConnect(Loading);
