import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

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
      <BorderButton>S&apos;abonner</BorderButton>
    </Container>
  );

export default ContributorButton;
