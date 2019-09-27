import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from 'app/theme';
import Check from 'components/atoms/icons/Check';

interface OnboardingStepContainer {
  active: boolean;
  theme: Theme;
}

const OnboardingStepContainer = styled.li<OnboardingStepContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 22px;
  color: ${({ active, theme }) => (active ? 'white' : theme.primaryColor)};
  font-weight: 500;
  background-color: ${({ active, theme }) =>
    active ? theme.activeColor : 'transparent'};

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

      border-left: 25px solid
        ${({ active, theme }) => (active ? '#f4f4f4' : theme.activeColor)};
    }
  }
`;

const Step = styled.span`
  margin-right: 10px;
  font-size: 32px;
`;

interface OnboardingStepProps {
  step: number;
  active: boolean;
  totalSteps: number;
  children: ReactNode;
}

const OnboardingStep = ({
  step,
  active,
  children,
  totalSteps
}: OnboardingStepProps) => {
  const isStepCompleted = () => !active && step < totalSteps;

  return (
    <OnboardingStepContainer active={active}>
      <Step>{!isStepCompleted() ? <>{String(step)}</> : <Check />}</Step>
      {children}
    </OnboardingStepContainer>
  );
};

export default OnboardingStep;
