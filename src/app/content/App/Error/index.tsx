import React from 'react';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from './Content';
import BorderButton from '../../../../components/atoms/Button/BorderButton';
import Illustration from './Illustration';

export default () => (
  <Container>
    <Illustration />
    <ContentTitle>Oops !</ContentTitle>
    <Content>
      Quelque chose s’est mal passé. Veuillez actualiser le plugin ou réessayer
      plus tard.
    </Content>
    <BorderButton>Actualiser</BorderButton>
  </Container>
);
