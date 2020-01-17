import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { Link, BackgroundButton } from 'components/atoms';
import { Question, Write } from 'components/atoms/icons';

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

const LinkNoNotice = styled(Link)`
  display: flex; 
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.activeColor};
  
  &:hover {
  color: ${props => props.theme.primaryColor};
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
        <Question/>
        Demander une info, un avis, un conseil
      </Button>
      <LinkNoNotice to="/contribute">
        <Write/>
        Poster une information
      </LinkNoNotice>
    </ButtonContainer>
  </>
);
