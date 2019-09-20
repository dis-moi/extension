import React from 'react';
import { action } from '@storybook/addon-actions';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import BullesLogo from 'components/atoms/icons/Logo';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

import { SuggestionsScreen } from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import { generateContributor } from 'test/fakers/generateContributor';
import BottomLine from '../OnboardingAtoms/BottomLine';

interface SubscribeScreenProps {
  updatedFromLmem: boolean;
}

export default ({ updatedFromLmem }: SubscribeScreenProps) => (
  <>
    <Intro>
      {updatedFromLmem ? <LMEMToBulles /> : <BullesLogo />}
      {updatedFromLmem && <OnboardingSteps activeStep={2} />}

      <SubTitle>
        Choisissez vos contributeurs pour recevoir leurs messages durant votre
        navigation
      </SubTitle>
    </Intro>

    <SuggestionsScreen
      suggestions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />

    <BottomLine />
  </>
);
