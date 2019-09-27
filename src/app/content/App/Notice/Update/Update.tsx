import React from 'react';
import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';
import LmemLogo from 'assets/img/logo/logo-lmem-background.png';

const Content = styled.section`
  margin-top: 50px;
  font-size: 14px;
  color: ${props => props.theme.primaryColor};
  text-align: center;

  h1 {
    margin-top: 4px;
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
  }

  p {
    margin: 0;

    &:last-of-type {
      margin-bottom: 34px;
    }
  }

  ${BackgroundButton} {
    margin-left: auto;
    margin-right: auto;
  }
`;

interface UpdateScreenProps {
  openOnboarding: () => void;
}

export default ({ openOnboarding }: UpdateScreenProps) => (
  <Content>
    <img src={LmemLogo} alt="Le Même en Mieux" />
    <h1>Le Même en Mieux</h1>
    <p>Bonjour, votre extension évolue.</p>
    <p>Pour continuer à l&apos;utiliser, merci de la mettre à jour.</p>
    <BackgroundButton onClick={openOnboarding}>Mettre à jour</BackgroundButton>
  </Content>
);
