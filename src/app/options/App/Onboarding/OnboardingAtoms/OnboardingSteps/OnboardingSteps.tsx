import React from 'react';
import styled from 'styled-components';
import OnboardingStep from './OnboardingStep';

const OnboardingStepsList = styled.ul`
  display: flex;
  max-width: 750px;
  height: 69px;
  padding: 0;
  list-style-type: none;
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
