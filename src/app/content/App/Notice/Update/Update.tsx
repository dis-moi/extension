import React from 'react';
import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';

const Content = styled.section`
  margin-top: 50px;
  font-size: 14px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
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
    <Text>
      Pour voir des bulles ou en créer, merci d&apos;accepter les Conditions
      Générales d&apos;Utilisation.
    </Text>
    <Button onClick={openOnboarding}>Lire et accepter les CGU</Button>
  </Content>
);
