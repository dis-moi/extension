import React from 'react';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import Illustration from './Illustration';
import BackgroundButton from 'components/atoms/Button/BackgroundButton';
import { Link } from 'react-router-dom';

export default () => (
  <>
    <Title>Pas de Bulle ici</Title>
    <ButtonContainer>
      <Illustration />
      <BackgroundButton as={Link} to="/contribute">
        Créer une Bulle
      </BackgroundButton>
    </ButtonContainer>
  </>
);
