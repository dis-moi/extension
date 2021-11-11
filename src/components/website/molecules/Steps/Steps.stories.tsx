import React from 'react';
import Steps, { steps, StepsProps } from './Steps';

export default {
  title: 'Website/Molecules',
  argTypes: {
    steps: {
      control: { type: 'object' }
    }
  }
};

export const _Steps = (args: StepsProps) => <Steps {...args} />;
_Steps.args = {
  steps: steps
};
