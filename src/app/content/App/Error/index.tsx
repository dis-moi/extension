import React from 'react';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from './Content';
import BorderButton from '../../../../components/atoms/Buttons/BorderButton';
import Illustration from './Illustration';
import Notification from '../../../../components/organisms/Notification';

export default () => (
  <Notification>
    <Container>
      <Illustration />
      <ContentTitle>Oops !</ContentTitle>
      <Content>
        Quelque chose s’est mal passé. Veuillez actualiser le plugin ou
        réessayer plus tard.
      </Content>
      <BorderButton>Actualiser</BorderButton>
    </Container>
  </Notification>
);
