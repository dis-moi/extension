import React from 'react';
import styled from 'styled-components';
import { lmemContributorIds } from 'app/lmemContributors';
import BullesLogo from 'components/atoms/LogoBeta';
import SuggestionsScreen from '../../Settings/SuggestionsScreen';
import OnboardingButton from '../OnboardingAtoms/OnboardingButton';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

const Title = styled(SubTitle)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
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
  background-color: rgba(250, 250, 250, 0.7);
`;

const InfoLine = styled.p`
  margin: 0;
  padding-top: 16px;
  font-size: 17px;
  font-weight: bold;
  color: #ba1b1b;
`;

const SuggestionsWrapper = styled.div`
  & > section {
    padding-bottom: 150px;
  }
`;

interface SubscribeScreenProps {
  updatedFromLmem: boolean;
  nbSubscriptions: number;
  next: () => void;
}

export default ({
  updatedFromLmem,
  nbSubscriptions,
  next
}: SubscribeScreenProps) => (
  <>
    <Intro>
      {updatedFromLmem ? <LMEMToBulles /> : <BullesLogo />}
      {updatedFromLmem && <OnboardingSteps activeStep={2} />}

      <Title>
        Choisissez vos contributeur·ice·s pour recevoir leurs messages durant
        votre navigation
      </Title>
    </Intro>

    <SuggestionsWrapper>
      <SuggestionsScreen
        preselectedContributorsIds={updatedFromLmem ? lmemContributorIds : null}
      />
    </SuggestionsWrapper>

    <BottomLineBg>
      {nbSubscriptions === 0 && (
        <InfoLine>Choisir au minimum 1 contributeur·ice</InfoLine>
      )}
      <OnboardingButton disabled={nbSubscriptions === 0} onClick={next}>
        Terminer
      </OnboardingButton>
    </BottomLineBg>
  </>
);
