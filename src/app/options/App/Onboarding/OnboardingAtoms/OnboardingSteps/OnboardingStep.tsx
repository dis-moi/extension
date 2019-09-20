import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface OnboardingStepContainer {
  active: boolean;
}

const OnboardingStepContainer = styled.li<OnboardingStepContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 22px;
  color: ${({ active }) => (active ? 'white' : 'grey')};
  font-weight: 500;
  background-color: ${({ active }) => (active ? 'blue' : 'transparent')};

  &:first-of-type {
    border-radius: 8px 0 0 8px;
  }

  &:last-of-type {
    position: relative;
    border-radius: 0 8px 8px 0;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 0;
      height: 0;
      border-top: 35px solid transparent;
      border-bottom: 35px solid transparent;

      border-left: 25px solid ${({ active }) => (active ? '#f4f4f4' : 'blue')};
    }
  }
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
