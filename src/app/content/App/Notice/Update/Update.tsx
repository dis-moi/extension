import React from 'react';
import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';
import LmemLogo from 'assets/img/logo/logo-lmem-background.png';

const Content = styled.section`
  margin-top: 50px;
  font-size: 14px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 4px;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 0;

  &:last-of-type {
    margin-bottom: 34px;
  }
`;

const Button = styled(BackgroundButton)`
  margin-left: auto;
  margin-right: auto;
`;

interface UpdateScreenProps {
  openOnboarding: () => void;
}

export default ({ openOnboarding }: UpdateScreenProps) => (
  <Content>
    <img src={LmemLogo} alt="Le Même en Mieux" />
    <Title>Le Même en Mieux</Title>
    <Text>Bonjour, votre extension évolue.</Text>
    <Text>Pour continuer à l&apos;utiliser, merci de la mettre à jour.</Text>
    <Button onClick={openOnboarding}>Mettre à jour</Button>
  </Content>
);
