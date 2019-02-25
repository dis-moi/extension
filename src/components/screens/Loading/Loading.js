import React from 'react';
import Illustration from './Illustration';
import Container from './Container';
import Notification from '../../organisms/Notification';

export default ({ close }) => (
  <Notification close={close}>
    <Container>
      <Illustration />
      Chargement…
    </Container>
  </Notification>
);
