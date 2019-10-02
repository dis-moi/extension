import React from 'react';
import styled from 'styled-components';

import SuggestionsScreen, {
  SuggestionsScreenProps
} from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import BullesLogo from 'components/atoms/LogoBeta';
import OnboardingButton from '../OnboardingAtoms/OnboardingButton';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

interface SubscribeScreenProps extends SuggestionsScreenProps {
  updatedFromLmem: boolean;
  nbSubscriptions: number;
  next: () => void;
}

const Title = styled(SubTitle)`
  margin-top: 20px;
`;

const BottomLineBg = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
`;

const InfoLine = styled.p`
  margin: 16px 0;
  font-size: 17px;
  font-weight: bold;
  color: #ba1b1b;
`;

const SuggestionsWrapper = styled.div`
  padding-top: ${({ updatedFromLmem }) =>
    updatedFromLmem ? '180px' : '400px'};

  & > section {
    padding-bottom: 150px;
  }
`;

const SubscribeIntro = styled(Intro)`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
`;

interface SubscribeScreenProps extends SuggestionsScreenProps {
  updatedFromLmem: boolean;
  nbSubscriptions: number;
  next: () => void;
}

export default ({
  updatedFromLmem,
  suggestions,
  subscribe,
  unsubscribe,
  nbSubscriptions,
  next
}: SubscribeScreenProps) => (
  <>
    <SubscribeIntro>
      {updatedFromLmem ? <LMEMToBulles /> : <BullesLogo />}
      {updatedFromLmem && <OnboardingSteps activeStep={2} />}

      <Title>
        Choisissez vos contributeurs pour recevoir leurs messages durant votre
        navigation
      </Title>
    </SubscribeIntro>

    <SuggestionsWrapper>
      <SuggestionsScreen
        suggestions={suggestions}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
      />
    </SuggestionsWrapper>

    <BottomLineBg>
      {nbSubscriptions === 0 && (
        <InfoLine>Choisir au minimum 1 contributeur</InfoLine>
      )}
      <OnboardingButton disabled={nbSubscriptions === 0} onClick={next}>
        Terminer
      </OnboardingButton>
    </BottomLineBg>
  </>
);
