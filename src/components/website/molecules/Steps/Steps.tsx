import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import Step from './Step';

export interface StepItem {
  index: number;
  title: string;
  detail: string;
}

export const steps: StepItem[] = [
  {
    index: 1,
    title: 'home.howItWorks.steps.step1.title',
    detail: 'home.howItWorks.steps.step1.detail'
  },
  {
    index: 2,
    title: 'home.howItWorks.steps.step2.title',
    detail: 'home.howItWorks.steps.step2.detail'
  },
  {
    index: 3,
    title: 'home.howItWorks.steps.step3.title',
    detail: 'home.howItWorks.steps.step3.detail'
  }
];

export interface StepsProps {
  className?: string;
  steps: StepItem[];
}

const Steps = styled(({ className, steps }: StepsProps) => {
  return (
    <div className={className}>
      {steps.map<React.ReactNode>((step, index) => (
        <Step key={index} {...step} />
      ))}
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  ${Step} {
    padding-bottom: 8px;
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
    flex-direction: row;
    ${Step} {
      flex-basis: ${props => 100 / props.steps.length}%;
    }
  }
`;

export default Steps;
