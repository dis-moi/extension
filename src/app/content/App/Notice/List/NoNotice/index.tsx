import React, { Fragment } from 'react';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import Illustration from './Illustration';
import BorderButton from 'components/atoms/Buttons/BorderButton';

export default () => (
  <Fragment>
    <Title>Pas de Bulle ici</Title>
    <ButtonContainer>
      <Illustration />
      <BorderButton>Créer une Bulle</BorderButton>
    </ButtonContainer>
  </Fragment>
);
