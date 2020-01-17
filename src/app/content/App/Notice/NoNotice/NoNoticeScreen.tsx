import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { BackgroundButton } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton/AddNoticeButton';
import { Question } from 'components/atoms/icons';

const Button = styled(BackgroundButton)`
  max-width: 236px;
  height: auto;
  margin-bottom: 60px;
  padding: 7px 16px;

  svg {
    width: 52px;
    height: auto;
    margin-right: 10px;
  }
`;

export default () => (
  <>
    <Title>
      Pour l&apos;instant, aucun de vos contributeurs n&apos;a posté
      d&apos;information sur cette page.
    </Title>
    <ButtonContainer>
      <Button as={ReactRouterDomLink} to="/question">
        <Question />
        Demander une info, un avis, un conseil
      </Button>
      <AddNoticeButton />
    </ButtonContainer>
  </>
);
