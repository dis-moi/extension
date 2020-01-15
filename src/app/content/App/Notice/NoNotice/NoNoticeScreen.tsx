import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { Link, BackgroundButton } from 'components/atoms';
import { Question, Write } from 'components/atoms/icons';

export default () => (
  <>
    <Title>
      Pour l&apos;instant, aucun de vos contributeurs n&apos;a posté
      d&apos;information sur cette page.
    </Title>
    <ButtonContainer>
      <BackgroundButton as={ReactRouterDomLink} to="/question">
        <Question />
        Demander une info, un avis, un conseil
      </BackgroundButton>
      <Link to="/contribute">
        <Write />
        Poster une information
      </Link>
    </ButtonContainer>
  </>
);
