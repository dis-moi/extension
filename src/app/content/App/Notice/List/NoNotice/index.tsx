import React, { Fragment } from 'react';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import Illustration from './Illustration';
import BorderButton from 'components/atoms/Buttons/BorderButton';

export default () => (
  <Fragment>
    <Title>Pas de recommandation pour cette page</Title>
    <ButtonContainer>
      <Illustration />
      <BorderButton
        as="a"
        href="https://form.jotformeu.com/82702852284358"
        target="_blank"
        rel="noopener noreferrer"
      >
        Créer une recommandation
      </BorderButton>
    </ButtonContainer>
  </Fragment>
);
