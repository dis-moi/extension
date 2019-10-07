import React from 'react';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import Illustration from './Illustration';
import BorderButton from 'components/atoms/Button/BorderButton';
import { Link } from 'react-router-dom';

export default () => (
  <>
    <Title>Pas de Bulle ici</Title>
    <ButtonContainer>
      <Illustration />
      <BorderButton as={Link} to="/contribute">
        Créer une Bulle
      </BorderButton>
    </ButtonContainer>
  </>
);
