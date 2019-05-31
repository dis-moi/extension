import React from 'react';
import Notification from 'components/organisms/Notification';
import Illustration from './Illustration';
import Container from './Container';
import withConnect from './withConnect';

interface Props {
  close: () => void;
}
export const Loading = ({ close }: Props) => (
  <Notification close={close}>
    <Container>
      <Illustration />
      Chargement…
    </Container>
  </Notification>
);

export default withConnect(Loading);
