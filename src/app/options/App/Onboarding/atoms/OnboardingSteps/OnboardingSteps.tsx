import React from 'react';
import styled from 'styled-components';
import OnboardingStep from './OnboardingStep';

const OnboardingStepsList = styled.ul`
  display: flex;
  max-width: 860px;
  height: 70px;
  margin: 40px auto;
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
    <OnboardingStep step={1} active={activeStep === 1} totalSteps={2}>
      Découvrir et accepter l&apos;évolution
    </OnboardingStep>
    <OnboardingStep step={2} active={activeStep === 2} totalSteps={2}>
      Choisir vos contributeur·ice·s
    </OnboardingStep>
  </OnboardingStepsList>
);

export default OnboardingSteps;
