import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Title1 } from 'components/atoms/Title1';
import { StepProps } from './index';

const titleAnim = keyframes`
  from {
    opacity: 0;
  }
  75% {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    transform: translateY(-42px);
  }`;
const titleLeftAnim = keyframes`
  from {
    margin-left: 0;
  }
  to {
    margin-left: 200px;
  }
`;
const titleLastAnim = keyframes`
  from {
    transform: translateY(-42px);
  }
  to {
    transform: translateY(-84px);
  }
`;

const AnimatedText = styled('span')`
  display: block;
  animation: ${titleAnim} 1.5s linear forwards,
    ${titleLeftAnim} 500ms linear forwards 2.5s,
    ${titleLastAnim} 500ms linear forwards 5s;
`;
const Step1Title = styled(Title1)`
  overflow: hidden;
`;

export default ({ next }: StepProps) => {
  const [animStep, setStep] = useState(1);
  const { t } = useTranslation('profiles');
  const onAnimationEnd = () => {
    setStep(animStep + 1);
    return animStep === 3 && next && next();
  };
  return (
    <>
      <Step1Title>
        <AnimatedText onAnimationEnd={onAnimationEnd}>
          <Trans t={t} i18nKey="view.onBoarding.step1">
            L&apos;installation a réussi !<br /> Chargement de votre
            expérience...
            <br /> Épinglez DisMoi
          </Trans>
        </AnimatedText>
      </Step1Title>
    </>
  );
};
