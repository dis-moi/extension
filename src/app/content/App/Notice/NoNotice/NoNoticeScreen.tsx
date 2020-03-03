import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { BackgroundButton } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton/AddNoticeButton';
import ServiceMessageLine from 'components/molecules/ServiceMessageLine/ServiceMessageLine';

const Container = styled(ButtonContainer)`
  font-size: 16px;
`;

const Button = styled(BackgroundButton)`
  height: auto;
  padding: 10px 16px;
  margin-bottom: 16px;
`;

export default () => (
  <>
    <Title>
      Pour l&apos;instant, aucun de vos contributeurs n&apos;a posté
      d&apos;information sur cette page.
    </Title>
    <Container>
      <Button as={ReactRouterDomLink} to="/question">
        Demander une info, un conseil
      </Button>
      <>ou</>
      <AddNoticeButton />
    </Container>

    <ServiceMessageLine />
  </>
);
