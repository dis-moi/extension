import React from 'react';
import { history } from '../../store';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from './Content';
import BackgroundButton from 'components/atoms/Button/BackgroundButton';
import Illustration from './Illustration';

export default () => (
  <Container>
    <Illustration />
    <ContentTitle>Oops !</ContentTitle>
    <Content>
      Quelque chose s’est mal passé. Veuillez réessayer plus tard.
    </Content>
    <BackgroundButton onClick={history.goBack}>Retour</BackgroundButton>
  </Container>
);
