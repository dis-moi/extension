import React from 'react';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Logo from 'components/atoms/icons/Logo';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';

export default () => (
  <Wrapper>
    <Intro>
      <Logo />

      <SubTitle>
        Choisissez vos contributeurs pour recevoir leurs messages durant votre
        navigation
      </SubTitle>
    </Intro>
  </Wrapper>
);
