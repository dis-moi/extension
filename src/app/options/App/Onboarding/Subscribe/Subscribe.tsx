import React from 'react';

import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import BullesLogo from 'components/atoms/icons/Logo';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

interface SubscribeScreenProps {
  updatedFromLmem: boolean;
}

export default ({ updatedFromLmem }: SubscribeScreenProps) => (
  <Wrapper>
    <Intro>
      {updatedFromLmem ? <LMEMToBulles /> : <BullesLogo />}
      {updatedFromLmem && <OnboardingSteps />}

      <SubTitle>
        Choisissez vos contributeurs pour recevoir leurs messages durant votre
        navigation
      </SubTitle>
    </Intro>
  </Wrapper>
);
