import React from 'react';
import styled from 'styled-components';

const OnboardingStepsList = styled.ul`
  display: flex;
  max-width: 426px;
  height: 69px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const OnboardingStep = styled.li`
  border: 1px solid red;
`;

const OnboardingSteps = (
  <OnboardingStepsList>
    <OnboardingStep>plop</OnboardingStep>
  </OnboardingStepsList>
);

export default OnboardingSteps;
