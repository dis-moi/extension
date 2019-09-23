import React from 'react';
import { storiesOf } from '@storybook/react';
import OnboardingSteps from './OnboardingSteps';

storiesOf('screens/Onboarding/components/OnboardingSteps', module)
  .add('1', () => <OnboardingSteps activeStep={1} />)
  .add('2', () => <OnboardingSteps activeStep={2} />);
