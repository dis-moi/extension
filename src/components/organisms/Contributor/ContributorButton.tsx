import React from 'react';
import styled, { css } from 'styled-components';
import BackgroundButton from 'components/atoms/Buttons/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Buttons/BorderButton/BorderButton';

const Container = styled.div`
  display: flex;

  & > * {
    flex-grow: 1;
    min-width: 100px;
    margin-top: 6px;
    text-transform: none;
  }
`;

interface Props {
  followed?: boolean;
}

const ContributorButton = ({ followed }: Props) =>
  followed ? (
    <Container>
      <BackgroundButton>Abonné</BackgroundButton>
    </Container>
  ) : (
    <Container>
      <BorderButton>Suivre</BorderButton>
    </Container>
  );

export default ContributorButton;
