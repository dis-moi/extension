import React from 'react';
import styled from 'styled-components';
import OnboardingStep from './OnboardingStep';

const OnboardingStepsList = styled.ul`
  display: flex;
  max-width: 426px;
  height: 69px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

interface OnboardingStepsProps {
  activeStep: number;
}

const OnboardingSteps = ({ activeStep }: OnboardingStepsProps) => (
  <OnboardingStepsList>
    <OnboardingStep step={String(1)} active={activeStep === 1}>
      Découvrir et accepter l&apos;évolution
    </OnboardingStep>
    <OnboardingStep step={String(2)} active={activeStep === 2}>
      Choisir vos contributeurs
    </OnboardingStep>
  </OnboardingStepsList>
);

export default OnboardingSteps;
