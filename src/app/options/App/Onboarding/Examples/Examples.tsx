import React from 'react';
import styled from 'styled-components';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Logo from 'components/atoms/icons/Logo';
import Title from '../OnboardingAtoms/OnboardingTitle';

const Title2 = styled(Title)`
  margin-top: 0;
  color: ${props => props.theme.activeColor};
`;

export default () => (
  <Wrapper>
    <Intro>
      <Logo />

      <Title>Installation réussie !</Title>
      <Title2>Découvrez des exemples de vos contributeurs !</Title2>
    </Intro>
  </Wrapper>
);
