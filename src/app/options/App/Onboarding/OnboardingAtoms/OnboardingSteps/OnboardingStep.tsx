import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface OnboardingStepContainer {
  active: boolean;
}

const OnboardingStepContainer = styled.li<OnboardingStepContainer>`
  border: 1px solid red;
  background-color: ${({ active }) => (active ? 'blue' : 'transparent')};
`;
interface OnboardingStepProps {
  step: string;
  active: boolean;
  children: ReactNode;
}

const OnboardingStep = ({ step, active, children }: OnboardingStepProps) => (
  <OnboardingStepContainer active={active}>
    {step} - {children}
  </OnboardingStepContainer>
);

export default OnboardingStep;
