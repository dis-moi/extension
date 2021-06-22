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
    title: 'Je m’abonne aux profils de mon choix.',
    detail: 'Eux et eux-seuls pourront me conseiller dans ma navigation !'
  },
  {
    index: 2,
    title: 'Je m’abonne aux profils de mon choix.',
    detail: 'Eux et eux-seuls pourront me conseiller dans ma navigation !'
  },
  {
    index: 3,
    title: 'Je bénéficie de leurs conseils.',
    detail: 'Directement sur les pages du web que je visite.'
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
`;

export default Steps;
