import React from 'react';
import styled from 'styled-components';

import {
  SuggestionsScreen,
  SuggestionsScreenProps
} from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import BullesLogo from 'components/atoms/icons/Logo';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

const BottomLineBg = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  padding-top: 30px;
  text-align: center;
  background-color: #fafafa;
`;

const InfoLine = styled.p`
  margin: 0 0 16px;
  font-size: 17px;
  font-weight: bold;
  color: #ba1b1b;
`;

const Button = styled(BackgroundButton)`
  padding: 15px 35px;
  height: auto;
  font-size: 24px;
`;

interface SubscribeScreenProps extends SuggestionsScreenProps {
  updatedFromLmem: boolean;
  nbSubscriptions: number;
}
export default ({
  updatedFromLmem,
  suggestions,
  subscribe,
  unsubscribe,
  nbSubscriptions
}: SubscribeScreenProps) => (
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
      suggestions={suggestions}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
    />

    <BottomLineBg>
      {nbSubscriptions === 0 && (
        <InfoLine>Choisir au minimum 1 contributeur</InfoLine>
      )}
      <Button disabled={nbSubscriptions === 0} to={`/onboarding/examples`}>
        Terminer
      </Button>
    </BottomLineBg>
  </>
);
